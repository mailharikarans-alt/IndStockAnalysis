import React from 'react';
import { StockProfile } from '../types/equity';
import { TrendingUp, MessageSquare, AlertCircle, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

interface QuarterlyReviewViewProps {
  stock: StockProfile;
}

export const QuarterlyReviewView: React.FC<QuarterlyReviewViewProps> = ({ stock }) => {
  const latestQ = stock.quarterlies[stock.quarterlies.length - 1];

  return (
    <div className="space-y-6">
      {/* Playbook Header */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-emerald-400 mb-1">
            PLAYBOOK C: QUARTERLY RESULTS & CONCALL DECONSTRUCTION
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {stock.name} — Recent Quarterly Trends
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Latest Reported: <span className="text-white font-bold">{latestQ.quarter}</span> (NSE/BSE Filings)
        </div>
      </div>

      {/* Latest Quarter Scorecard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Quarter Revenue</div>
          <div className="text-base font-bold font-mono text-white mt-1">₹{latestQ.revenueCr.toLocaleString('en-IN')} cr</div>
          <div className="text-xs font-mono text-emerald-400 mt-0.5 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>YoY: +{latestQ.yoyRevenueGrowth}%</span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">QoQ Revenue Growth</div>
          <div className={`text-base font-bold font-mono mt-1 ${latestQ.qoqRevenueGrowth >= 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
            {latestQ.qoqRevenueGrowth > 0 ? `+${latestQ.qoqRevenueGrowth}%` : `${latestQ.qoqRevenueGrowth}%`}
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-0.5">Sequential momentum</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Operating Margin</div>
          <div className="text-base font-bold font-mono text-emerald-400 mt-1">{latestQ.ebitdaMargin}%</div>
          <div className="text-[11px] font-mono text-slate-500 mt-0.5">EBITDA Margin</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Quarterly PAT</div>
          <div className="text-base font-bold font-mono text-white mt-1">₹{latestQ.patCr.toLocaleString('en-IN')} cr</div>
          <div className="text-xs font-mono text-emerald-400 mt-0.5 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>YoY PAT: +{latestQ.yoyPatGrowth}%</span>
          </div>
        </div>
      </div>

      {/* Quarterly Performance Table */}
      <div className="bg-slate-900/60 rounded-lg border border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 font-semibold">
          <span>Quarterly YoY & QoQ Trajectory (Consolidated, ₹ cr)</span>
          <span className="text-slate-500 text-[11px]">Due within 45 days of quarter end (SEBI LODR)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Quarter</th>
                <th className="py-2.5 px-3 text-right">Revenue (₹ cr)</th>
                <th className="py-2.5 px-3 text-right">YoY (%)</th>
                <th className="py-2.5 px-3 text-right">QoQ (%)</th>
                <th className="py-2.5 px-3 text-right">EBITDA Margin (%)</th>
                <th className="py-2.5 px-3 text-right">PAT (₹ cr)</th>
                <th className="py-2.5 px-3 text-right">YoY PAT (%)</th>
                <th className="py-2.5 px-3 text-right">QoQ PAT (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {stock.quarterlies.map((q) => (
                <tr key={q.quarter} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {q.quarter}
                  </td>
                  <td className="py-2.5 px-3 text-right">₹{q.revenueCr.toLocaleString('en-IN')}</td>
                  <td className={`py-2.5 px-3 text-right font-medium ${q.yoyRevenueGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {q.yoyRevenueGrowth > 0 ? `+${q.yoyRevenueGrowth}%` : `${q.yoyRevenueGrowth}%`}
                  </td>
                  <td className={`py-2.5 px-3 text-right ${q.qoqRevenueGrowth >= 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {q.qoqRevenueGrowth > 0 ? `+${q.qoqRevenueGrowth}%` : `${q.qoqRevenueGrowth}%`}
                  </td>
                  <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">{q.ebitdaMargin}%</td>
                  <td className="py-2.5 px-3 text-right text-white font-medium">₹{q.patCr.toLocaleString('en-IN')}</td>
                  <td className={`py-2.5 px-3 text-right font-medium ${q.yoyPatGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {q.yoyPatGrowth > 0 ? `+${q.yoyPatGrowth}%` : `${q.yoyPatGrowth}%`}
                  </td>
                  <td className={`py-2.5 px-3 text-right ${q.qoqPatGrowth >= 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {q.qoqPatGrowth > 0 ? `+${q.qoqPatGrowth}%` : `${q.qoqPatGrowth}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Concall Transcripts & Investor Presentation Highlights */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Earnings Concall Transcripts & Forward Guidance Highlights</span>
        </h3>
        <div className="space-y-3">
          {stock.quarterlies.slice().reverse().map((q) => (
            <div key={q.quarter} className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-white">{q.quarter} Earnings Concall Commentary</span>
                <span className="text-slate-500">Official IR Transcript</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                "{q.concallHighlight}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory SEBI Disclaimer */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded text-xs text-slate-400 leading-relaxed font-mono">
        <span className="font-semibold text-amber-400 uppercase tracking-wide block mb-1">
          Mandatory Disclaimer:
        </span>
        This analysis is for educational and informational purposes only. It is not investment advice or a SEBI-registered research recommendation. Verify data from primary sources and consult a SEBI-registered advisor before investing.
      </div>
    </div>
  );
};
