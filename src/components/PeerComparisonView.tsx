import React, { useState } from 'react';
import { StockProfile, PeerMetric } from '../types/equity';
import { ArrowUpDown, Award, ShieldCheck, Scale } from 'lucide-react';

interface PeerComparisonViewProps {
  stock: StockProfile;
  onSelectPeerTicker?: (ticker: string) => void;
}

type SortField = 'marketCapCr' | 'peTTM' | 'evEbitda' | 'roce5YrAvg' | 'patCagr3Yr' | 'promoterPledge' | 'debtToEquity';

export const PeerComparisonView: React.FC<PeerComparisonViewProps> = ({ stock, onSelectPeerTicker }) => {
  const [sortField, setSortField] = useState<SortField>('marketCapCr');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const sortedPeers = [...stock.peers].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA - valB : valB - valA;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Find best-in-class
  const highestRoce = Math.max(...stock.peers.map(p => p.roce5YrAvg));
  const highestGrowth = Math.max(...stock.peers.map(p => p.patCagr3Yr));
  const lowestPe = Math.min(...stock.peers.filter(p => p.peTTM > 0).map(p => p.peTTM));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-emerald-400 mb-1">
            PLAYBOOK D: PEER COMPARISON MATRIX (SAME BASIS, CONSOLIDATED, ₹ CR)
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {stock.sector} — Industry Peer Set
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Ranked on: <span className="text-emerald-400 font-bold uppercase">{sortField}</span>
        </div>
      </div>

      {/* Peer Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Highest 5-Yr RoCE</span>
          </div>
          <div className="text-base font-bold font-mono text-white mt-1">{highestRoce}%</div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
            Leader: {stock.peers.find(p => p.roce5YrAvg === highestRoce)?.name}
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fastest 3-Yr PAT CAGR</span>
          </div>
          <div className="text-base font-bold font-mono text-white mt-1">+{highestGrowth}%</div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
            Leader: {stock.peers.find(p => p.patCagr3Yr === highestGrowth)?.name}
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lowest P/E Multiple</span>
          </div>
          <div className="text-base font-bold font-mono text-white mt-1">{lowestPe}x</div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
            Entity: {stock.peers.find(p => p.peTTM === lowestPe)?.name}
          </div>
        </div>
      </div>

      {/* Interactive Peer Table */}
      <div className="bg-slate-900/60 rounded-lg border border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="font-semibold">Normalized Peer Benchmarking Table (Consolidated, ₹ cr)</span>
          <span className="text-slate-500 text-[11px]">Click any header to sort</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Entity</th>
                <th className="py-2.5 px-3">Ticker</th>
                <th 
                  onClick={() => handleSort('marketCapCr')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  <span className="inline-flex items-center gap-1">
                    Market Cap (₹ cr) <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </span>
                </th>
                <th 
                  onClick={() => handleSort('peTTM')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  <span className="inline-flex items-center gap-1">
                    P/E (TTM) <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </span>
                </th>
                <th 
                  onClick={() => handleSort('evEbitda')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  <span className="inline-flex items-center gap-1">
                    EV/EBITDA <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </span>
                </th>
                <th 
                  onClick={() => handleSort('roce5YrAvg')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  <span className="inline-flex items-center gap-1">
                    5-Yr RoCE (%) <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </span>
                </th>
                <th 
                  onClick={() => handleSort('patCagr3Yr')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  <span className="inline-flex items-center gap-1">
                    3-Yr PAT CAGR (%) <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </span>
                </th>
                <th 
                  onClick={() => handleSort('promoterPledge')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  <span className="inline-flex items-center gap-1">
                    Pledge (%) <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </span>
                </th>
                <th 
                  onClick={() => handleSort('debtToEquity')}
                  className="py-2.5 px-4 text-right cursor-pointer hover:text-white"
                >
                  <span className="inline-flex items-center gap-1">
                    D/E <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {sortedPeers.map((p) => {
                const isCurrent = p.symbol === stock.symbol;
                return (
                  <tr 
                    key={p.symbol} 
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isCurrent ? 'bg-emerald-950/20 font-semibold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-4 text-white flex items-center gap-2">
                      {isCurrent ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0"></span>
                      )}
                      <span>{p.name}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">{p.symbol}</td>
                    <td className="py-2.5 px-3 text-right">₹{p.marketCapCr.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">{p.peTTM}x</td>
                    <td className="py-2.5 px-3 text-right">{p.evEbitda}x</td>
                    <td className="py-2.5 px-3 text-right font-medium text-white">{p.roce5YrAvg}%</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400">+{p.patCagr3Yr}%</td>
                    <td className={`py-2.5 px-3 text-right ${p.promoterPledge > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
                      {p.promoterPledge}%
                    </td>
                    <td className="py-2.5 px-4 text-right">{p.debtToEquity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
