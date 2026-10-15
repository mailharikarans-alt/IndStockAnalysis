import React, { useState } from 'react';
import { StockProfile, DCFModelInputs } from '../types/equity';
import { calculateDCF } from '../utils/dcfCalculator';
import { generateAgentsMarkdownReport } from '../utils/reportExporter';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Sliders, 
  Download, 
  Copy, 
  Check, 
  ExternalLink,
  HelpCircle,
  TrendingDown,
  TrendingUp,
  Scale
} from 'lucide-react';

interface DeepDiveViewProps {
  stock: StockProfile;
}

export const DeepDiveView: React.FC<DeepDiveViewProps> = ({ stock }) => {
  const [dcfParams, setDcfParams] = useState<DCFModelInputs>(stock.dcfDefaults);
  const [copied, setCopied] = useState(false);

  // Shares outstanding approximation
  const sharesOutstandingCr = stock.marketCapCr / stock.currentPrice;
  const netDebtCr = (stock.financials[stock.financials.length - 1].debtToEquity * (stock.marketCapCr / stock.pbRatio)) * 0.35;

  const dcfResult = calculateDCF(dcfParams, sharesOutstandingCr, netDebtCr);

  const handleCopyMarkdown = () => {
    const md = generateAgentsMarkdownReport(stock);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = generateAgentsMarkdownReport(stock);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${stock.symbol}_AGENTS_DeepDive_${stock.asOfDate.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Report Header */}
      <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-emerald-400 mb-1">
            AGENTS.MD SECTION 8 INSTITUTIONAL DEEP-DIVE REPORT
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {stock.name} <span className="text-slate-400 text-base font-normal">(NSE: {stock.symbol} | BSE: {stock.bseCode})</span>
          </h1>
          <div className="text-xs font-mono text-slate-400 mt-1 flex flex-wrap gap-x-2">
            <span>ISIN: {stock.isin}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Basis: Consolidated</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Currency: INR (₹ crore)</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Report Date: {stock.asOfDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy MD'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-950 font-semibold bg-emerald-400 hover:bg-emerald-300 rounded transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report (.md)</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: SNAPSHOT */}
      <section className="space-y-3">
        <h3 className="text-sm font-mono uppercase text-emerald-400 font-bold tracking-wider">
          ## 1. Snapshot
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Current Price</div>
            <div className="text-sm font-bold font-mono text-white mt-1">₹{stock.currentPrice}</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Market Cap</div>
            <div className="text-sm font-bold font-mono text-slate-200 mt-1">₹{stock.marketCapCr.toLocaleString('en-IN')} cr</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Cap Bucket</div>
            <div className="text-sm font-semibold font-mono text-slate-200 mt-1">{stock.marketCapBucket}</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">52W Range</div>
            <div className="text-xs font-mono text-slate-300 mt-1">₹{stock.low52w} – ₹{stock.high52w}</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">P/E (TTM)</div>
            <div className="text-sm font-bold font-mono text-emerald-400 mt-1">{stock.peTTM}x</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">P/B Ratio</div>
            <div className="text-sm font-bold font-mono text-slate-200 mt-1">{stock.pbRatio}x</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Daily Turnover</div>
            <div className="text-sm font-bold font-mono text-slate-200 mt-1">₹{stock.avgDailyTurnoverCr} cr</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Delivery %</div>
            <div className="text-sm font-bold font-mono text-slate-200 mt-1">{stock.deliveryPercent}%</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: BUSINESS & MOAT */}
      <section className="space-y-4">
        <h3 className="text-sm font-mono uppercase text-emerald-400 font-bold tracking-wider">
          ## 2. Business & Moat
        </h3>
        <div className="p-5 bg-slate-900/60 rounded-lg border border-slate-800 space-y-4">
          <p className="text-sm text-slate-200 leading-relaxed">
            {stock.businessDescription}
          </p>

          <div>
            <div className="text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
              Revenue Mix by Segment
            </div>
            <div className="space-y-2">
              {stock.revenueMix.map((seg, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>{seg.segment}</span>
                    <span className="font-semibold">{seg.percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${seg.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <div className="text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
              Moat Classification: <span className="text-emerald-400">{stock.moatType}</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {stock.moatDrivers.map((driver, idx) => (
                <li key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded text-xs text-slate-300">
                  <span className="text-emerald-400 font-mono font-bold mr-1.5">0{idx + 1}.</span>
                  {driver}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: FINANCIAL SUMMARY */}
      <section className="space-y-4">
        <h3 className="text-sm font-mono uppercase text-emerald-400 font-bold tracking-wider">
          ## 3. Financial Summary (FY22 → TTM & Last 4 Quarters)
        </h3>
        <div className="bg-slate-900/60 rounded-lg border border-slate-800 overflow-hidden">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Historical Financial Statement Performance (₹ cr)</span>
            <span>Units: ₹ crore | Accounting: Consolidated</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Metric / FY</th>
                  {stock.financials.map(f => (
                    <th key={f.year} className="py-2.5 px-3 text-right">{f.year}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-semibold text-white">Revenue from Operations</td>
                  {stock.financials.map(f => (
                    <td key={f.year} className="py-2.5 px-3 text-right">₹{f.revenueCr.toLocaleString('en-IN')}</td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4">EBITDA</td>
                  {stock.financials.map(f => (
                    <td key={f.year} className="py-2.5 px-3 text-right">₹{f.ebitdaCr.toLocaleString('en-IN')}</td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4">EBITDA Margin (%)</td>
                  {stock.financials.map(f => (
                    <td key={f.year} className="py-2.5 px-3 text-right">{f.ebitdaMargin}%</td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-800/30 font-semibold text-white">
                  <td className="py-2.5 px-4">Net Profit (PAT)</td>
                  {stock.financials.map(f => (
                    <td key={f.year} className="py-2.5 px-3 text-right text-white">₹{f.patCr.toLocaleString('en-IN')}</td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-800/30 text-emerald-400">
                  <td className="py-2.5 px-4 font-semibold">Cash Flow from Operations (CFO)</td>
                  {stock.financials.map(f => (
                    <td key={f.year} className="py-2.5 px-3 text-right">₹{f.cfoCr.toLocaleString('en-IN')}</td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4">Free Cash Flow (FCF)</td>
                  {stock.financials.map(f => (
                    <td key={f.year} className="py-2.5 px-3 text-right">₹{f.fcfCr.toLocaleString('en-IN')}</td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4">Cash Conversion (CFO / PAT %)</td>
                  {stock.financials.map(f => (
                    <td key={f.year} className={`py-2.5 px-3 text-right font-medium ${f.cashConversion < 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {f.cashConversion}%
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4">Return on Capital Employed (RoCE)</td>
                  {stock.financials.map(f => (
                    <td key={f.year} className="py-2.5 px-3 text-right">{f.roce}%</td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4">Debt / Equity</td>
                  {stock.financials.map(f => (
                    <td key={f.year} className="py-2.5 px-3 text-right">{f.debtToEquity}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sector-Specific Lens Card */}
        <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800">
          <div className="text-xs font-mono uppercase text-emerald-400 font-semibold mb-3">
            AGENTS.md Section 5 Sector-Specific Lens: {stock.sector}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {stock.sectorMetrics.map((sm, idx) => (
              <div key={idx} className="p-3 bg-slate-950/80 rounded border border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400">{sm.label}</div>
                <div className="text-sm font-bold font-mono text-white mt-1">{sm.value}</div>
                {sm.benchmark && (
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">Benchmark: {sm.benchmark}</div>
                )}
                <div className="text-xs text-slate-300 mt-2 border-t border-slate-800/60 pt-1.5 leading-relaxed">
                  {sm.assessment}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: QUALITY & GOVERNANCE CHECK */}
      <section className="space-y-4">
        <h3 className="text-sm font-mono uppercase text-emerald-400 font-bold tracking-wider">
          ## 4. Quality & Governance Check (12 Red-Flag Scan)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
              Shareholding Pattern
            </div>
            <div className="space-y-1.5 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span>Promoter Holding:</span>
                <span className="font-bold text-white">{stock.promoterHolding}%</span>
              </div>
              <div className="flex justify-between">
                <span>Promoter Pledge:</span>
                <span className={stock.promoterPledge > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {stock.promoterPledge}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>FII Holding:</span>
                <span className="text-slate-200">{stock.fiiHolding}%</span>
              </div>
              <div className="flex justify-between">
                <span>DII / Mutual Funds:</span>
                <span className="text-slate-200">{stock.diiHolding}%</span>
              </div>
              <div className="flex justify-between">
                <span>Public Shareholding:</span>
                <span className="text-slate-200">{stock.publicHolding}%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-3 md:col-span-2">
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
              Auditor & Accounting Integrity
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-300">
              <div>
                <span className="text-slate-500">Statutory Auditor:</span> {stock.auditor} (Tenure: {stock.auditorTenureYears} years)
              </div>
              <div>
                <span className="text-slate-500">Audit Opinion:</span> {stock.auditorQualifications}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                Section 6 Red Flag Verification Checks
              </div>
              <div className="space-y-2">
                {stock.redFlags.map((rf) => (
                  <div key={rf.id} className="flex items-start gap-2 text-xs">
                    {rf.status === 'clean' && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />}
                    {rf.status === 'watch' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />}
                    {rf.status === 'flag' && <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />}
                    <div>
                      <span className="font-semibold text-slate-200">{rf.title}: </span>
                      <span className="text-slate-400">{rf.details} </span>
                      <span className="text-[10px] text-slate-600 font-mono">[{rf.source}]</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: VALUATION & INTERACTIVE DCF */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase text-emerald-400 font-bold tracking-wider">
            ## 5. Valuation (Relative Peers + Interactive DCF)
          </h3>
          <span className="text-xs font-mono text-slate-500">
            India 10-Yr G-Sec Benchmark: {dcfParams.riskFreeRate}%
          </span>
        </div>

        {/* Peer Table */}
        <div className="bg-slate-900/60 rounded-lg border border-slate-800 overflow-hidden">
          <div className="p-3 border-b border-slate-800 text-xs font-mono text-slate-400">
            Relative Valuation vs Listed Peers (Consolidated, ₹ cr)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Entity</th>
                  <th className="py-2.5 px-3">Ticker</th>
                  <th className="py-2.5 px-3 text-right">Market Cap (₹ cr)</th>
                  <th className="py-2.5 px-3 text-right">P/E (TTM)</th>
                  <th className="py-2.5 px-3 text-right">EV/EBITDA</th>
                  <th className="py-2.5 px-3 text-right">5-Yr RoCE (%)</th>
                  <th className="py-2.5 px-3 text-right">3-Yr PAT CAGR (%)</th>
                  <th className="py-2.5 px-3 text-right">Pledge (%)</th>
                  <th className="py-2.5 px-4 text-right">D/E</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {stock.peers.map((peer) => {
                  const isCurrent = peer.symbol === stock.symbol;
                  return (
                    <tr key={peer.symbol} className={`hover:bg-slate-800/30 ${isCurrent ? 'bg-emerald-950/20 font-semibold' : ''}`}>
                      <td className="py-2.5 px-4 text-white flex items-center gap-1.5">
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                        {peer.name}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">{peer.symbol}</td>
                      <td className="py-2.5 px-3 text-right">₹{peer.marketCapCr.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400">{peer.peTTM}x</td>
                      <td className="py-2.5 px-3 text-right">{peer.evEbitda}x</td>
                      <td className="py-2.5 px-3 text-right">{peer.roce5YrAvg}%</td>
                      <td className="py-2.5 px-3 text-right">+{peer.patCagr3Yr}%</td>
                      <td className={`py-2.5 px-3 text-right ${peer.promoterPledge > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{peer.promoterPledge}%</td>
                      <td className="py-2.5 px-4 text-right">{peer.debtToEquity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive DCF Modeler */}
        <div className="p-5 bg-slate-900/80 rounded-lg border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                Discounted Cash Flow (DCF) Engine
              </span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Implied Fair Value: <span className="text-white font-bold text-sm">₹{dcfResult.impliedSharePrice}</span> (vs CMP ₹{stock.currentPrice})
              <span className={`ml-2 font-semibold ${dcfResult.upsideDownsidePercent > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {dcfResult.upsideDownsidePercent > 0 ? `+${dcfResult.upsideDownsidePercent}%` : `${dcfResult.upsideDownsidePercent}%`} ({dcfResult.marginOfSafetyStatus})
              </span>
            </div>
          </div>

          {/* Interactive Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="space-y-1.5 p-3 bg-slate-950/60 rounded border border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>10-Yr G-Sec (Risk-Free):</span>
                <span className="text-white font-semibold">{dcfParams.riskFreeRate}%</span>
              </div>
              <input
                type="range"
                min="6.0"
                max="8.0"
                step="0.05"
                value={dcfParams.riskFreeRate}
                onChange={(e) => setDcfParams({ ...dcfParams, riskFreeRate: parseFloat(e.target.value) })}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500">RBI sovereign 10-yr benchmark</div>
            </div>

            <div className="space-y-1.5 p-3 bg-slate-950/60 rounded border border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>5-Yr Revenue CAGR:</span>
                <span className="text-white font-semibold">{dcfParams.fiveYearRevGrowth}%</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="35.0"
                step="0.5"
                value={dcfParams.fiveYearRevGrowth}
                onChange={(e) => setDcfParams({ ...dcfParams, fiveYearRevGrowth: parseFloat(e.target.value) })}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500">Explicit forecast period</div>
            </div>

            <div className="space-y-1.5 p-3 bg-slate-950/60 rounded border border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Operating Margin:</span>
                <span className="text-white font-semibold">{dcfParams.operatingMargin}%</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="40.0"
                step="0.5"
                value={dcfParams.operatingMargin}
                onChange={(e) => setDcfParams({ ...dcfParams, operatingMargin: parseFloat(e.target.value) })}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500">EBIT margin profile</div>
            </div>

            <div className="space-y-1.5 p-3 bg-slate-950/60 rounded border border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Terminal Growth Rate:</span>
                <span className="text-white font-semibold">{dcfParams.terminalGrowthRate}%</span>
              </div>
              <input
                type="range"
                min="3.5"
                max="6.0"
                step="0.25"
                value={dcfParams.terminalGrowthRate}
                onChange={(e) => setDcfParams({ ...dcfParams, terminalGrowthRate: parseFloat(e.target.value) })}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500">Long-term Indian GDP proxy</div>
            </div>
          </div>

          {/* DCF Output Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-950 rounded border border-slate-800">
              <div className="text-slate-500">Cost of Equity (Ke)</div>
              <div className="text-white font-bold text-sm mt-1">{dcfResult.costOfEquity}%</div>
            </div>
            <div className="p-3 bg-slate-950 rounded border border-slate-800">
              <div className="text-slate-500">Computed WACC</div>
              <div className="text-emerald-400 font-bold text-sm mt-1">{dcfResult.wacc}%</div>
            </div>
            <div className="p-3 bg-slate-950 rounded border border-slate-800">
              <div className="text-slate-500">PV of Explicit FCFs</div>
              <div className="text-white font-bold text-sm mt-1">₹{dcfResult.pvExplicitCr.toLocaleString('en-IN')} cr</div>
            </div>
            <div className="p-3 bg-slate-950 rounded border border-slate-800">
              <div className="text-slate-500">Terminal Value (PV)</div>
              <div className="text-white font-bold text-sm mt-1">₹{dcfResult.pvTerminalValueCr.toLocaleString('en-IN')} cr</div>
            </div>
          </div>

          {/* Sensitivity Matrix */}
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
              Sensitivity Matrix: Implied Price across WACC vs Terminal Growth Rate
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs font-mono border border-slate-800 rounded">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3 text-left">WACC \ g</th>
                    {dcfResult.sensitivityTable[0].values.map((v) => (
                      <th key={v.terminalGrowth} className="py-2 px-3">{v.terminalGrowth}%</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {dcfResult.sensitivityTable.map((row) => (
                    <tr key={row.wacc}>
                      <td className="py-2 px-3 text-left font-bold text-slate-300">{row.wacc}%</td>
                      {row.values.map((cell) => {
                        const isHigher = cell.sharePrice > stock.currentPrice;
                        return (
                          <td
                            key={cell.terminalGrowth}
                            className={`py-2 px-3 font-semibold ${
                              isHigher ? 'text-emerald-400 bg-emerald-950/20' : 'text-slate-300'
                            }`}
                          >
                            ₹{cell.sharePrice}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TECHNICAL & LIQUIDITY CONTEXT */}
      <section className="space-y-3">
        <h3 className="text-sm font-mono uppercase text-emerald-400 font-bold tracking-wider">
          ## 6. Technical & Liquidity Context
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div className="text-slate-500">50 & 200 DMA</div>
            <div className="text-white font-semibold mt-1">50 DMA: ₹{stock.dma50}</div>
            <div className="text-slate-400">200 DMA: ₹{stock.dma200}</div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div className="text-slate-500">Circuit Limits & Bands</div>
            <div className="text-white font-semibold mt-1">{stock.circuitBand}</div>
            <div className="text-slate-400">Dynamic F&O surveillance</div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div className="text-slate-500">Exchange Surveillance</div>
            <div className="text-emerald-400 font-semibold mt-1">{stock.asmGsmStatus}</div>
            <div className="text-slate-400">No ASM/GSM stages</div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
            <div className="text-slate-500">Exit Liquidity Assessment</div>
            <div className="text-white font-semibold mt-1">High Institutional</div>
            <div className="text-slate-400">ADTV ₹{stock.avgDailyTurnoverCr} cr</div>
          </div>
        </div>
      </section>

      {/* SECTION 7 & 8: CATALYSTS & RISKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="space-y-2">
          <h3 className="text-sm font-mono uppercase text-emerald-400 font-bold tracking-wider">
            ## 7. Catalysts
          </h3>
          <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
            {stock.catalysts.map((cat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-emerald-400 font-mono font-bold">0{idx + 1}.</span>
                <span>{cat}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-mono uppercase text-rose-400 font-bold tracking-wider">
            ## 8. Risks
          </h3>
          <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
            {stock.risks.map((risk, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-rose-400 font-mono font-bold">0{idx + 1}.</span>
                <span>{risk}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* SECTION 9: BULL / BASE / BEAR SCENARIOS */}
      <section className="space-y-3">
        <h3 className="text-sm font-mono uppercase text-emerald-400 font-bold tracking-wider">
          ## 9. Bull / Base / Bear Scenarios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-lg space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-rose-400 font-bold">
              <span>BEAR CASE</span>
              <span>{stock.bearScenario.targetRange}</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="text-slate-400 font-mono block mb-1">Assumptions:</span>
              {stock.bearScenario.assumptions}
            </div>
            <div className="text-xs text-rose-300/80 pt-1 border-t border-rose-900/30">
              {stock.bearScenario.downsideRisk}
            </div>
          </div>

          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-slate-200 font-bold">
              <span>BASE CASE</span>
              <span className="text-emerald-400">{stock.baseScenario.targetRange}</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="text-slate-400 font-mono block mb-1">Assumptions:</span>
              {stock.baseScenario.assumptions}
            </div>
            <div className="text-xs text-slate-400 pt-1 border-t border-slate-800">
              {stock.baseScenario.thesisDrivers}
            </div>
          </div>

          <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-lg space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-emerald-400 font-bold">
              <span>BULL CASE</span>
              <span>{stock.bullScenario.targetRange}</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="text-slate-400 font-mono block mb-1">Assumptions:</span>
              {stock.bullScenario.assumptions}
            </div>
            <div className="text-xs text-emerald-300/80 pt-1 border-t border-emerald-900/30">
              {stock.bullScenario.upsideTriggers}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: BOTTOM LINE */}
      <section className="space-y-3">
        <h3 className="text-sm font-mono uppercase text-emerald-400 font-bold tracking-wider">
          ## 10. Bottom Line & Falsification Conditions
        </h3>
        <div className="p-5 bg-slate-900/60 rounded-lg border border-slate-800 space-y-4">
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold block mb-1">
              [ASSESSMENT] Core Verdict
            </span>
            <p className="text-sm text-slate-200 leading-relaxed">
              {stock.bottomLineAssessment}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <span className="text-xs font-mono uppercase text-amber-400 font-semibold block mb-1">
              What Would Change Our Mind (Falsification Criteria)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {stock.whatWouldChangeMind}
            </p>
          </div>
        </div>
      </section>

      {/* SOURCES & DISCLAIMER */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="text-xs font-mono text-slate-400 space-y-1">
          <div className="text-slate-500 font-semibold uppercase">Sources & Data Dates:</div>
          {stock.sources.map((src, idx) => (
            <div key={idx}>
              • {src.title} ({src.period}) — <span className="text-slate-500">{src.type}</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded text-xs text-slate-400 leading-relaxed font-mono">
          <span className="font-semibold text-amber-400 uppercase tracking-wide block mb-1">
            Mandatory Disclaimer (AGENTS.md Section 1):
          </span>
          This analysis is for educational and informational purposes only. It is not investment advice or a SEBI-registered research recommendation. Verify data from primary sources and consult a SEBI-registered advisor before investing.
        </div>
      </div>
    </div>
  );
};
