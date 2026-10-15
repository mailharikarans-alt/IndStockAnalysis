import React, { useState } from 'react';
import { StockProfile } from '../types/equity';
import { Filter, Sliders, CheckCircle, XCircle, Sparkles, Building } from 'lucide-react';

interface ScreenBuilderViewProps {
  stocks: StockProfile[];
  onSelectStock: (stock: StockProfile) => void;
}

interface FilterCriteria {
  minMcapCr: number;
  minRoce: number;
  maxDebtToEquity: number;
  maxPromoterPledge: number;
  minPatCagr: number;
  maxPe: number;
  requireCleanAsm: boolean;
}

const PRESET_SCREENS: { name: string; description: string; criteria: FilterCriteria }[] = [
  {
    name: 'High ROCE Compounders',
    description: 'Disciplined capital allocators with RoCE > 18%, D/E < 0.5, zero promoter pledge, and steady earnings expansion.',
    criteria: {
      minMcapCr: 5000,
      minRoce: 18,
      maxDebtToEquity: 0.5,
      maxPromoterPledge: 0.0,
      minPatCagr: 15,
      maxPe: 90,
      requireCleanAsm: true,
    }
  },
  {
    name: 'Clean Governance & Reasonable Valuation',
    description: 'Companies with zero pledge, low debt, clean audit track record, and reasonable valuation (P/E < 35).',
    criteria: {
      minMcapCr: 10000,
      minRoce: 14,
      maxDebtToEquity: 0.8,
      maxPromoterPledge: 0.0,
      minPatCagr: 10,
      maxPe: 35,
      requireCleanAsm: true,
    }
  },
  {
    name: 'Capital Goods & Infrastructure Leaders',
    description: 'Infrastructure and manufacturing scale players with strong execution and robust balance sheets.',
    criteria: {
      minMcapCr: 25000,
      minRoce: 15,
      maxDebtToEquity: 1.0,
      maxPromoterPledge: 2.0,
      minPatCagr: 12,
      maxPe: 50,
      requireCleanAsm: true,
    }
  }
];

export const ScreenBuilderView: React.FC<ScreenBuilderViewProps> = ({ stocks, onSelectStock }) => {
  const [activePreset, setActivePreset] = useState<string>('High ROCE Compounders');
  const [criteria, setCriteria] = useState<FilterCriteria>(PRESET_SCREENS[0].criteria);

  const applyPreset = (preset: typeof PRESET_SCREENS[0]) => {
    setActivePreset(preset.name);
    setCriteria(preset.criteria);
  };

  // Filter stocks
  const matchingStocks = stocks.filter((s) => {
    const fLatest = s.financials[s.financials.length - 1];
    const avgRoce = s.financials.reduce((acc, curr) => acc + curr.roce, 0) / s.financials.length;
    const numYears = 4;
    const patCagr = (Math.pow(Math.max(fLatest.patCr, 1) / Math.max(s.financials[0].patCr, 1), 1 / numYears) - 1) * 100;

    const matchesMcap = s.marketCapCr >= criteria.minMcapCr;
    const matchesRoce = avgRoce >= criteria.minRoce;
    const matchesDebt = fLatest.debtToEquity <= criteria.maxDebtToEquity;
    const matchesPledge = s.promoterPledge <= criteria.maxPromoterPledge;
    const matchesPatCagr = patCagr >= criteria.minPatCagr;
    const matchesPe = s.peTTM <= criteria.maxPe;
    const matchesAsm = !criteria.requireCleanAsm || s.asmGsmStatus.toLowerCase().includes('clean') || s.asmGsmStatus.toLowerCase().includes('none');

    return matchesMcap && matchesRoce && matchesDebt && matchesPledge && matchesPatCagr && matchesPe && matchesAsm;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-emerald-400 mb-1">
            PLAYBOOK F: QUANTITATIVE SCREEN BUILDER (RESEARCH CANDIDATES)
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Systematic Fundamental Screener
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Matched: <span className="text-emerald-400 font-bold">{matchingStocks.length}</span> of {stocks.length} tracked entities
        </div>
      </div>

      {/* Preset Screener Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PRESET_SCREENS.map((preset) => {
          const isSelected = activePreset === preset.name;
          return (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/50 shadow-sm'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-mono font-bold text-white mb-1 flex items-center justify-between">
                <span>{preset.name}</span>
                {isSelected && <span className="text-[10px] text-emerald-400 uppercase font-semibold">Active</span>}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Filter Sliders */}
      <div className="p-5 bg-slate-900/60 rounded-lg border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            Custom Filter Parameters (Strictly Stated Units: ₹ cr)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
          <div className="space-y-1.5 p-3 bg-slate-950/60 rounded border border-slate-800">
            <div className="flex justify-between text-slate-400">
              <span>Minimum Market Cap:</span>
              <span className="text-white font-semibold">₹{criteria.minMcapCr.toLocaleString('en-IN')} cr</span>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={criteria.minMcapCr}
              onChange={(e) => setCriteria({ ...criteria, minMcapCr: parseInt(e.target.value, 10) })}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5 p-3 bg-slate-950/60 rounded border border-slate-800">
            <div className="flex justify-between text-slate-400">
              <span>Minimum 5-Yr Avg RoCE:</span>
              <span className="text-white font-semibold">{criteria.minRoce}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="30"
              step="1"
              value={criteria.minRoce}
              onChange={(e) => setCriteria({ ...criteria, minRoce: parseInt(e.target.value, 10) })}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5 p-3 bg-slate-950/60 rounded border border-slate-800">
            <div className="flex justify-between text-slate-400">
              <span>Maximum Debt / Equity:</span>
              <span className="text-white font-semibold">{criteria.maxDebtToEquity}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.05"
              value={criteria.maxDebtToEquity}
              onChange={(e) => setCriteria({ ...criteria, maxDebtToEquity: parseFloat(e.target.value) })}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5 p-3 bg-slate-950/60 rounded border border-slate-800">
            <div className="flex justify-between text-slate-400">
              <span>Max Promoter Pledge:</span>
              <span className="text-white font-semibold">{criteria.maxPromoterPledge}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={criteria.maxPromoterPledge}
              onChange={(e) => setCriteria({ ...criteria, maxPromoterPledge: parseFloat(e.target.value) })}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5 p-3 bg-slate-950/60 rounded border border-slate-800">
            <div className="flex justify-between text-slate-400">
              <span>Min 3-Yr PAT CAGR:</span>
              <span className="text-white font-semibold">+{criteria.minPatCagr}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              step="1"
              value={criteria.minPatCagr}
              onChange={(e) => setCriteria({ ...criteria, minPatCagr: parseInt(e.target.value, 10) })}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5 p-3 bg-slate-950/60 rounded border border-slate-800">
            <div className="flex justify-between text-slate-400">
              <span>Max P/E (TTM):</span>
              <span className="text-white font-semibold">{criteria.maxPe}x</span>
            </div>
            <input
              type="range"
              min="15"
              max="100"
              step="5"
              value={criteria.maxPe}
              onChange={(e) => setCriteria({ ...criteria, maxPe: parseInt(e.target.value, 10) })}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Screen Results Table */}
      <div className="bg-slate-900/60 rounded-lg border border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="font-semibold">Matching Research Candidates ({matchingStocks.length})</span>
          <span className="text-slate-500 text-[11px]">Click row to open comprehensive AGENTS analysis</span>
        </div>
        {matchingStocks.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-slate-500">
            No entities match the current strict quantitative thresholds. Try relaxing P/E or Market Cap filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Company</th>
                  <th className="py-2.5 px-3">Sector</th>
                  <th className="py-2.5 px-3 text-right">CMP (₹)</th>
                  <th className="py-2.5 px-3 text-right">Mcap (₹ cr)</th>
                  <th className="py-2.5 px-3 text-right">P/E (TTM)</th>
                  <th className="py-2.5 px-3 text-right">Avg RoCE (%)</th>
                  <th className="py-2.5 px-3 text-right">Pledge (%)</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {matchingStocks.map((stock) => {
                  const avgRoce = Math.round((stock.financials.reduce((acc, curr) => acc + curr.roce, 0) / stock.financials.length) * 10) / 10;
                  return (
                    <tr
                      key={stock.id}
                      onClick={() => onSelectStock(stock)}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                    >
                      <td className="py-2.5 px-4 text-white font-semibold">
                        <div>{stock.name}</div>
                        <div className="text-[11px] text-slate-500 font-normal">{stock.symbol} · BSE: {stock.bseCode}</div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">{stock.sector}</td>
                      <td className="py-2.5 px-3 text-right text-white font-bold">₹{stock.currentPrice}</td>
                      <td className="py-2.5 px-3 text-right">₹{stock.marketCapCr.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400">{stock.peTTM}x</td>
                      <td className="py-2.5 px-3 text-right text-white font-medium">{avgRoce}%</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400">{stock.promoterPledge}%</td>
                      <td className="py-2.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-xs">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Candidate</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mandatory SEBI Disclaimer */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded text-xs text-slate-400 leading-relaxed font-mono">
        <span className="font-semibold text-amber-400 uppercase tracking-wide block mb-1">
          Mandatory Disclaimer:
        </span>
        Screen outputs are purely quantitative candidates for further qualitative research, NOT buy/sell recommendations. This analysis is for educational and informational purposes only. It is not investment advice or a SEBI-registered research recommendation.
      </div>
    </div>
  );
};
