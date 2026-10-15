import React, { useState } from 'react';
import { StockProfile } from '../types/equity';
import { ShieldAlert, PieChart, AlertTriangle, Check, Plus, Trash2, ArrowUpRight } from 'lucide-react';

interface WatchlistScannerViewProps {
  availableStocks: StockProfile[];
  onSelectStock: (stock: StockProfile) => void;
}

export const WatchlistScannerView: React.FC<WatchlistScannerViewProps> = ({
  availableStocks,
  onSelectStock,
}) => {
  const [watchlistIds, setWatchlistIds] = useState<string[]>(['lt', 'tatamotors', 'hdfcbank', 'dixon']);

  const watchlist = availableStocks.filter(s => watchlistIds.includes(s.id));

  const totalMarketCap = watchlist.reduce((acc, curr) => acc + curr.marketCapCr, 0);

  // Sector breakdown
  const sectorCounts: { [key: string]: number } = {};
  watchlist.forEach(s => {
    sectorCounts[s.sector] = (sectorCounts[s.sector] || 0) + 1;
  });

  // Weighted metrics approximation
  const weightedPe = Math.round((watchlist.reduce((acc, curr) => acc + (curr.peTTM * curr.marketCapCr), 0) / (totalMarketCap || 1)) * 10) / 10;
  const weightedRoce = Math.round((watchlist.reduce((acc, curr) => acc + (curr.financials[curr.financials.length - 1].roce * curr.marketCapCr), 0) / (totalMarketCap || 1)) * 10) / 10;

  // Red flags scan across watchlist
  const totalWatchlistFlags = watchlist.reduce((acc, curr) => acc + curr.redFlags.filter(rf => rf.status === 'flag').length, 0);
  const totalWatchlistWatches = watchlist.reduce((acc, curr) => acc + curr.redFlags.filter(rf => rf.status === 'watch').length, 0);

  const handleToggleWatchlist = (id: string) => {
    if (watchlistIds.includes(id)) {
      setWatchlistIds(watchlistIds.filter(item => item !== id));
    } else {
      setWatchlistIds([...watchlistIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-emerald-400 mb-1">
            PLAYBOOK E: PORTFOLIO & WATCHLIST HEALTH SCANNER
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Multi-Holding Diagnostic & Governance Scanner
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Tracking <span className="text-white font-bold">{watchlist.length}</span> Indian listed equities
        </div>
      </div>

      {/* Aggregate Health Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Weighted P/E (TTM)</div>
          <div className="text-base font-bold font-mono text-emerald-400 mt-1">{weightedPe}x</div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">Weighted by Mcap</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Weighted RoCE</div>
          <div className="text-base font-bold font-mono text-white mt-1">{weightedRoce}%</div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">Capital efficiency</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Red Flag Violations</div>
          <div className="text-base font-bold font-mono mt-1 flex items-center gap-1.5">
            {totalWatchlistFlags === 0 ? (
              <span className="text-emerald-400">0 High Flags</span>
            ) : (
              <span className="text-rose-400">{totalWatchlistFlags} High Flags</span>
            )}
            <span className="text-amber-400 text-xs font-normal">({totalWatchlistWatches} watch)</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">Section 6 Audit</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 rounded border border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Combined Market Cap</div>
          <div className="text-base font-bold font-mono text-white mt-1">₹{totalMarketCap.toLocaleString('en-IN')} cr</div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">{Object.keys(sectorCounts).length} Sectors</div>
        </div>
      </div>

      {/* Sector Concentration */}
      <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-3">
        <div className="text-xs font-mono uppercase text-slate-300 font-semibold flex items-center justify-between">
          <span>Sector Concentration & Allocation Spread</span>
          <span className="text-slate-500 text-[11px]">Diversification Check</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(sectorCounts).map(([sec, count]) => {
            const pct = Math.round((count / watchlist.length) * 100);
            return (
              <div key={sec} className="p-3 bg-slate-950/60 rounded border border-slate-800 text-xs font-mono">
                <div className="text-slate-400 truncate" title={sec}>{sec}</div>
                <div className="text-base font-bold text-white mt-1">{count} stock{count > 1 ? 's' : ''} ({pct}%)</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Watchlist Table */}
      <div className="bg-slate-900/60 rounded-lg border border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="font-semibold">Holdings Scan (Consolidated, ₹ cr)</span>
          <span className="text-slate-500 text-[11px]">Click stock row to inspect full AGENTS report</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Entity</th>
                <th className="py-2.5 px-3">Sector</th>
                <th className="py-2.5 px-3 text-right">CMP (₹)</th>
                <th className="py-2.5 px-3 text-right">Mcap (₹ cr)</th>
                <th className="py-2.5 px-3 text-right">P/E (TTM)</th>
                <th className="py-2.5 px-3 text-right">Pledge (%)</th>
                <th className="py-2.5 px-3 text-center">Red Flags</th>
                <th className="py-2.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {watchlist.map((stock) => {
                const flagCount = stock.redFlags.filter(rf => rf.status === 'flag').length;
                const watchCount = stock.redFlags.filter(rf => rf.status === 'watch').length;
                return (
                  <tr 
                    key={stock.id} 
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                    onClick={() => onSelectStock(stock)}
                  >
                    <td className="py-2.5 px-4 text-white font-semibold">
                      <div>{stock.name}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{stock.symbol} · BSE: {stock.bseCode}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">{stock.sector}</td>
                    <td className="py-2.5 px-3 text-right text-white font-bold">₹{stock.currentPrice}</td>
                    <td className="py-2.5 px-3 text-right">₹{stock.marketCapCr.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400">{stock.peTTM}x</td>
                    <td className={`py-2.5 px-3 text-right ${stock.promoterPledge > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
                      {stock.promoterPledge}%
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {flagCount === 0 && watchCount === 0 && (
                        <span className="text-emerald-400 font-semibold">Clean</span>
                      )}
                      {flagCount > 0 && (
                        <span className="text-rose-400 font-bold">{flagCount} Flag{flagCount > 1 ? 's' : ''}</span>
                      )}
                      {watchCount > 0 && flagCount === 0 && (
                        <span className="text-amber-400">{watchCount} Watch</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleWatchlist(stock.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove from watchlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Available Stocks Selector */}
      <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-3">
        <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
          Add or Remove Tickers in Watchlist Scanner:
        </div>
        <div className="flex flex-wrap gap-2">
          {availableStocks.map((stk) => {
            const inList = watchlistIds.includes(stk.id);
            return (
              <button
                key={stk.id}
                onClick={() => handleToggleWatchlist(stk.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
                  inList
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {inList ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                <span>{stk.symbol} ({stk.sector})</span>
              </button>
            );
          })}
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
