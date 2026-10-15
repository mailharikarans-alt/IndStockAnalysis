import React from 'react';
import { StockProfile } from '../types/equity';
import { Search, Building, ShieldAlert, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TickerBarProps {
  stocks: StockProfile[];
  selectedStock: StockProfile;
  onSelectStock: (stock: StockProfile) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TickerBar: React.FC<TickerBarProps> = ({
  stocks,
  selectedStock,
  onSelectStock,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Stock Selector & Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Stock Selectors */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {stocks.map((s) => {
              const isSelected = s.id === selectedStock.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectStock(s)}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  {s.symbol}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative flex items-center min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter NSE / BSE ticker..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 font-mono"
            />
          </div>
        </div>

        {/* Live Active Stock Metadata Line (Zero-Pill discipline) */}
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-slate-400">
          <span className="text-white font-semibold flex items-center gap-1">
            <Building className="w-3.5 h-3.5 text-slate-500 inline" />
            {selectedStock.symbol}
            <span className="text-slate-500 text-[11px] font-normal">
              (BSE: {selectedStock.bseCode})
            </span>
          </span>

          <span aria-hidden="true" className="text-slate-700">·</span>

          <span className="text-slate-200 font-semibold">
            ₹{selectedStock.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>

          <span aria-hidden="true" className="text-slate-700">·</span>

          <span>
            Mcap: <span className="text-slate-300 font-medium">₹{selectedStock.marketCapCr.toLocaleString('en-IN')} cr</span>
          </span>

          <span aria-hidden="true" className="text-slate-700">·</span>

          <span>
            P/E: <span className="text-slate-300 font-medium">{selectedStock.peTTM}x</span>
          </span>

          <span aria-hidden="true" className="text-slate-700">·</span>

          <span>
            Pledge: <span className={selectedStock.promoterPledge > 0 ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-medium'}>
              {selectedStock.promoterPledge}%
            </span>
          </span>

          <span aria-hidden="true" className="text-slate-700">·</span>

          <span>
            Delivery: <span className="text-slate-300 font-medium">{selectedStock.deliveryPercent}%</span>
          </span>

          <span aria-hidden="true" className="text-slate-700">·</span>

          <span className="text-slate-500 text-[11px]">
            As of {selectedStock.asOfDate}
          </span>
        </div>
      </div>
    </div>
  );
};
