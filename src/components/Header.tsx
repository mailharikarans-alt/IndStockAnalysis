import React from 'react';
import { PlaybookType } from '../types/equity';
import { ShieldCheck, FileSpreadsheet, Bot, Sparkles } from 'lucide-react';

interface HeaderProps {
  activePlaybook: PlaybookType;
  onSelectPlaybook: (playbook: PlaybookType) => void;
  onOpenVerificationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePlaybook,
  onSelectPlaybook,
  onOpenVerificationModal,
}) => {
  const navItems: { id: PlaybookType; label: string }[] = [
    { id: 'quick-screen', label: 'Quick Screen' },
    { id: 'deep-dive', label: 'Deep-Dive Report' },
    { id: 'quarterly-review', label: 'Quarterly Results' },
    { id: 'peer-comparison', label: 'Peer Matrix' },
    { id: 'watchlist-scanner', label: 'Portfolio Health' },
    { id: 'screen-builder', label: 'Screen Builder' },
    { id: 'ipo-analyzer', label: 'IPOs & Events' },
    { id: 'multi-agent-room', label: 'Multi-Agent Lab' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
          <span className="text-lg font-bold tracking-tight text-white font-mono flex items-center gap-1.5">
            <span className="text-emerald-400">BHARAT</span>EQUITY
          </span>
          <span className="text-xs px-2 py-0.5 font-mono text-slate-400 border border-slate-800 rounded">
            AGENTS.md
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activePlaybook === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectPlaybook(item.id)}
                className={`whitespace-nowrap transition-colors py-1 cursor-pointer text-xs font-semibold uppercase tracking-wider ${
                  isActive
                    ? 'text-emerald-400 border-b-2 border-emerald-400 pb-0.5'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Verification Checklist */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenVerificationModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-md transition-colors cursor-pointer"
            title="Open AGENTS.md 11-Point Verification Checklist"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Verification Checklist</span>
          </button>
          
          <button
            onClick={() => onSelectPlaybook('multi-agent-room')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Agent Synthesis</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Scroller */}
      <div className="lg:hidden flex items-center gap-4 px-4 py-2 border-t border-slate-800/80 overflow-x-auto no-scrollbar bg-slate-950/80">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectPlaybook(item.id)}
            className={`whitespace-nowrap text-xs py-1 px-2 rounded font-medium transition-colors ${
              activePlaybook === item.id
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
