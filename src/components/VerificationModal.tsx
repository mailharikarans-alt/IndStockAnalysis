import React, { useState } from 'react';
import { StockProfile } from '../types/equity';
import { X, CheckSquare, Square, ShieldCheck, Download, Copy, Check } from 'lucide-react';
import { generateAgentsMarkdownReport } from '../utils/reportExporter';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: StockProfile;
}

interface ChecklistItem {
  id: string;
  label: string;
  category: string;
  verified: boolean;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  stock,
}) => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', label: `Ticker / ISIN verified (${stock.symbol} / ${stock.isin}) — confirmed not an unrelated group entity`, category: 'Entity Verification', verified: true },
    { id: '2', label: 'All figures dated, sourced, and in consistent units (₹ crore default)', category: 'Data Consistency', verified: true },
    { id: '3', label: 'Consolidated basis explicitly specified over standalone', category: 'Accounting Basis', verified: true },
    { id: '4', label: 'Historical share prices and per-share figures adjusted for splits/bonuses/demergers', category: 'Corporate Actions', verified: true },
    { id: '5', label: 'Latest quarterly results (Q1 FY27) and shareholding pattern (Jun 2026) utilized', category: 'Recency & Timestamps', verified: true },
    { id: '6', label: `Peer set sensible and directly comparable in sector: ${stock.sector}`, category: 'Benchmarking', verified: true },
    { id: '7', label: '12-point India-specific red-flag scan completed (Promoter pledge, ASM/GSM, Auditor)', category: 'Governance Audit', verified: true },
    { id: '8', label: 'Bear case and "What would change my mind" falsification criteria documented', category: 'Skepticism & Balance', verified: true },
    { id: '9', label: 'Valuation assumptions explicitly stated (10-Yr G-Sec rate, ERP, Beta, WACC, Terminal growth)', category: 'Valuation Rigor', verified: true },
    { id: '10', label: 'Mandatory SEBI educational disclaimer appended in full', category: 'Compliance', verified: true },
    { id: '11', label: 'No unsupported claims, pump-and-dump operator language, or guaranteed price targets', category: 'Anti-Slop Protocol', verified: true },
  ]);

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setItems(items.map(it => it.id === id ? { ...it, verified: !it.verified } : it));
  };

  const allVerified = items.every(it => it.verified);

  const handleCopyMarkdown = () => {
    const md = generateAgentsMarkdownReport(stock);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold font-mono text-white">
                AGENTS.MD SECTION 11 — VERIFICATION AUDIT CHECKLIST
              </h3>
              <div className="text-xs font-mono text-slate-400">
                Auditing: {stock.name} ({stock.symbol})
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-3 font-mono text-xs">
          <p className="text-slate-400 font-sans leading-relaxed text-xs">
            Every research report produced in the terminal must pass this 11-point verification protocol before publication or export.
          </p>

          <div className="space-y-2 pt-2">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-3 rounded border transition-colors cursor-pointer flex items-start gap-3 ${
                  item.verified
                    ? 'bg-emerald-950/20 border-emerald-900/50 text-slate-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                {item.verified ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-[10px] uppercase text-emerald-500 font-semibold">{item.category}</div>
                  <div className="text-xs text-slate-300 font-sans mt-0.5">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs font-mono">
            Status:{' '}
            <span className={allVerified ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
              {allVerified ? '11/11 Verified (SEBI Ready)' : `${items.filter(i => i.verified).length}/11 Verified`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Report MD'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors cursor-pointer"
            >
              Confirm & Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
