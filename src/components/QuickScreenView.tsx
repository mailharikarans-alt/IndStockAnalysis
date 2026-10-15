import React from 'react';
import { StockProfile } from '../types/equity';
import { 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Scale, 
  Download, 
  Copy, 
  Check, 
  ArrowUpRight, 
  FileText,
  BadgeAlert
} from 'lucide-react';
import { generateAgentsMarkdownReport } from '../utils/reportExporter';

interface QuickScreenViewProps {
  stock: StockProfile;
}

export const QuickScreenView: React.FC<QuickScreenViewProps> = ({ stock }) => {
  const [copied, setCopied] = React.useState(false);

  // Compute 5-year metrics
  const fFirst = stock.financials[0];
  const fLatest = stock.financials[stock.financials.length - 2] || stock.financials[stock.financials.length - 1]; // FY26
  const numYears = 4; // FY22 to FY26
  const revCagr = Math.round((Math.pow(fLatest.revenueCr / fFirst.revenueCr, 1 / numYears) - 1) * 1000) / 10;
  const patCagr = Math.round((Math.pow(Math.max(fLatest.patCr, 1) / Math.max(fFirst.patCr, 1), 1 / numYears) - 1) * 1000) / 10;
  const avgRoce = Math.round((stock.financials.reduce((acc, curr) => acc + curr.roce, 0) / stock.financials.length) * 10) / 10;
  const avgRoe = Math.round((stock.financials.reduce((acc, curr) => acc + curr.roe, 0) / stock.financials.length) * 10) / 10;

  const redFlagsCount = stock.redFlags.filter(rf => rf.status === 'flag').length;
  const watchCount = stock.redFlags.filter(rf => rf.status === 'watch').length;

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
    a.download = `${stock.symbol}_AGENTS_Analysis_${stock.asOfDate.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Screen Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <span>PLAYBOOK A: QUICK STOCK SCREEN (≈5 MIN)</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-400">As of {stock.asOfDate}</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {stock.name} <span className="text-slate-400 text-sm font-normal">({stock.symbol} | BSE: {stock.bseCode})</span>
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded transition-colors cursor-pointer"
            title="Copy AGENTS.md formatted markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy MD'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded transition-colors cursor-pointer"
            title="Download complete report as .md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Snapshot Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">CMP & MCap</div>
          <div className="text-base font-bold font-mono text-white mt-1">₹{stock.currentPrice}</div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">₹{stock.marketCapCr.toLocaleString('en-IN')} cr</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Valuation (TTM)</div>
          <div className="text-base font-bold font-mono text-emerald-400 mt-1">{stock.peTTM}x P/E</div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">EV/EBITDA: {stock.evEbitda}x</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">5-Yr Revenue CAGR</div>
          <div className="text-base font-bold font-mono text-white mt-1">{revCagr > 0 ? `+${revCagr}%` : `${revCagr}%`}</div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">PAT CAGR: +{patCagr}%</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Capital Efficiency</div>
          <div className="text-base font-bold font-mono text-emerald-400 mt-1">{avgRoce}% ROCE</div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">Avg RoE: {avgRoe}%</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Promoter Pledge</div>
          <div className={`text-base font-bold font-mono mt-1 ${stock.promoterPledge > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {stock.promoterPledge}%
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">Holding: {stock.promoterHolding}%</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Red Flag Scan</div>
          <div className="text-base font-bold font-mono mt-1 flex items-center gap-1.5">
            {redFlagsCount === 0 ? (
              <span className="text-emerald-400">0 Flags</span>
            ) : (
              <span className="text-rose-400">{redFlagsCount} Flags</span>
            )}
            {watchCount > 0 && <span className="text-amber-400 text-xs">({watchCount} watch)</span>}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">{stock.asmGsmStatus}</div>
        </div>
      </div>

      {/* One-Screen Assessment Takeaway */}
      <div className="p-5 bg-slate-900/60 rounded-lg border border-slate-800 space-y-4">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-semibold">
            [ASSESSMENT] One-Paragraph Take
          </span>
          <p className="text-sm text-slate-200 leading-relaxed mt-1">
            {stock.bottomLineAssessment}
          </p>
        </div>

        {/* 3 Strengths vs 3 Risks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded">
            <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
              <TrendingUp className="w-4 h-4" />
              <span>Core Strengths & Moat</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {stock.moatDrivers.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">0{idx + 1}.</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded">
            <div className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Key Vulnerabilities & Bear Case</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {stock.risks.slice(0, 3).map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-mono">0{idx + 1}.</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5-Year Financial & Cash Conversion Table */}
      <div className="bg-slate-900/60 rounded-lg border border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-slate-300 font-semibold">
            5-Year Financial Trend & Cash Flow Conversion (Consolidated, ₹ cr)
          </span>
          <span className="text-[11px] font-mono text-slate-500">Source: Statutory Filings</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Period</th>
                <th className="py-2.5 px-3 font-semibold text-right">Revenue (₹ cr)</th>
                <th className="py-2.5 px-3 font-semibold text-right">EBITDA (₹ cr)</th>
                <th className="py-2.5 px-3 font-semibold text-right">Margin (%)</th>
                <th className="py-2.5 px-3 font-semibold text-right">PAT (₹ cr)</th>
                <th className="py-2.5 px-3 font-semibold text-right">CFO (₹ cr)</th>
                <th className="py-2.5 px-3 font-semibold text-right">FCF (₹ cr)</th>
                <th className="py-2.5 px-3 font-semibold text-right">CFO/PAT (%)</th>
                <th className="py-2.5 px-3 font-semibold text-right">RoCE (%)</th>
                <th className="py-2.5 px-4 font-semibold text-right">D/E</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {stock.financials.map((row) => (
                <tr key={row.year} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white">{row.year}</td>
                  <td className="py-2.5 px-3 text-right">₹{row.revenueCr.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-right">₹{row.ebitdaCr.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-right">{row.ebitdaMargin}%</td>
                  <td className="py-2.5 px-3 text-right font-medium text-white">₹{row.patCr.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400">₹{row.cfoCr.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-right">₹{row.fcfCr.toLocaleString('en-IN')}</td>
                  <td className={`py-2.5 px-3 text-right font-semibold ${row.cashConversion < 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {row.cashConversion}%
                  </td>
                  <td className="py-2.5 px-3 text-right">{row.roce}%</td>
                  <td className="py-2.5 px-4 text-right">{row.debtToEquity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mandatory SEBI Disclaimer */}
      <div className="p-4 bg-slate-950 border border-slate-800/80 rounded text-xs text-slate-400 leading-relaxed font-mono">
        <span className="font-semibold text-amber-400 uppercase tracking-wide block mb-1">
          Mandatory Disclaimer (AGENTS.md Section 1):
        </span>
        This analysis is for educational and informational purposes only. It is not investment advice or a SEBI-registered research recommendation. Verify data from primary sources and consult a SEBI-registered advisor before investing.
      </div>
    </div>
  );
};
