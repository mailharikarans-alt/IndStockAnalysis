import React, { useState } from 'react';
import { MOCK_IPOS, MOCK_CORPORATE_EVENTS, IPOAnalysisItem, CorporateEventItem } from '../data/ipoAndEvents';
import { Rocket, Sparkles, AlertTriangle, Scale, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const IpoAndEventsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ipos' | 'events'>('ipos');
  const [selectedIpo, setSelectedIpo] = useState<IPOAnalysisItem>(MOCK_IPOS[0]);
  const [selectedEvent, setSelectedEvent] = useState<CorporateEventItem>(MOCK_CORPORATE_EVENTS[0]);

  return (
    <div className="space-y-6">
      {/* Sub-Header & Mode Switcher */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-emerald-400 mb-1">
            PLAYBOOK G & H: NEW LISTINGS (IPOS) & CORPORATE RESTRUCTURING
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Capital Markets & Corporate Action Intelligence
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded">
          <button
            onClick={() => setActiveTab('ipos')}
            className={`px-3 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
              activeTab === 'ipos'
                ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Playbook G: IPO Analyzer
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
              activeTab === 'events'
                ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Playbook H: Corporate Actions
          </button>
        </div>
      </div>

      {activeTab === 'ipos' ? (
        <div className="space-y-6">
          {/* IPO Selector Tabs */}
          <div className="flex gap-2">
            {MOCK_IPOS.map((ipo) => (
              <button
                key={ipo.id}
                onClick={() => setSelectedIpo(ipo)}
                className={`px-3.5 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
                  selectedIpo.id === ipo.id
                    ? 'bg-slate-800 text-emerald-400 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {ipo.companyName}
              </button>
            ))}
          </div>

          {/* Selected IPO Detail Card */}
          <div className="p-5 bg-slate-900/60 rounded-lg border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white font-mono">{selectedIpo.companyName}</h3>
                <div className="text-xs font-mono text-slate-400">
                  Sector: {selectedIpo.sector} · Expected Timeline: {selectedIpo.issueDates}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-500">Price Band</div>
                <div className="text-sm font-bold font-mono text-emerald-400">{selectedIpo.priceBand}</div>
              </div>
            </div>

            {/* Fresh vs OFS Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950/60 rounded border border-slate-800">
                <div className="text-slate-500">Total Issue Size</div>
                <div className="text-base font-bold text-white mt-1">₹{selectedIpo.issueSizeCr.toLocaleString('en-IN')} cr</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Primary + Secondary</div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded border border-slate-800">
                <div className="text-slate-500">Fresh Issue (Growth Capital)</div>
                <div className="text-base font-bold text-emerald-400 mt-1">₹{selectedIpo.freshIssueCr.toLocaleString('en-IN')} cr</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {Math.round((selectedIpo.freshIssueCr / selectedIpo.issueSizeCr) * 100)}% goes to company
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded border border-slate-800">
                <div className="text-slate-500">Offer for Sale (OFS)</div>
                <div className="text-base font-bold text-amber-400 mt-1">₹{selectedIpo.ofsCr.toLocaleString('en-IN')} cr</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Promoter / Early investor exit ({selectedIpo.ofsPromoterPercent}%)
                </div>
              </div>
            </div>

            {/* Objects of the Issue */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Objects of the Issue (DRHP / RHP Prospectus)
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedIpo.objectsOfIssue.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Anchor Investors */}
            <div className="p-3 bg-slate-950/60 rounded border border-slate-800 space-y-1 text-xs font-mono">
              <div className="text-slate-400 font-semibold">Anchor Investor Allocations:</div>
              <div className="text-slate-300 flex flex-wrap gap-2 pt-1">
                {selectedIpo.anchorInvestors.map((anc, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-200">
                    {anc}
                  </span>
                ))}
              </div>
            </div>

            {/* Red Flags & GMP Warning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded space-y-2">
                <div className="text-xs font-mono text-rose-400 font-bold uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>DRHP Risk Disclosures</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {selectedIpo.drhpRedFlags.map((rf, idx) => (
                    <li key={idx}>• {rf}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded space-y-2">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase flex items-center gap-1.5">
                  <Scale className="w-4 h-4" />
                  <span>GMP Fallacy Notice (Section 9.G)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedIpo.gmpWarningNotice}
                </p>
              </div>
            </div>

            {/* Verdict */}
            <div className="p-4 bg-slate-950 rounded border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono uppercase text-emerald-400 font-bold">
                  [ASSESSMENT] Institutional Verdict: {selectedIpo.verdict}
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {selectedIpo.verdictReason}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Corporate Event Selector */}
          <div className="flex gap-2">
            {MOCK_CORPORATE_EVENTS.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setSelectedEvent(ev)}
                className={`px-3.5 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
                  selectedEvent.id === ev.id
                    ? 'bg-slate-800 text-emerald-400 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {ev.companyName}
              </button>
            ))}
          </div>

          {/* Selected Event Card */}
          <div className="p-5 bg-slate-900/60 rounded-lg border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white font-mono">{selectedEvent.companyName}</h3>
                <div className="text-xs font-mono text-slate-400">
                  Event: {selectedEvent.eventType} · Timeline: {selectedEvent.recordDate}
                </div>
              </div>
              <div className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                {selectedEvent.whoBenefits}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 bg-slate-950/60 rounded border border-slate-800 space-y-1">
                <div className="text-slate-500 uppercase font-semibold">Terms & Restructuring Ratio</div>
                <div className="text-slate-200 font-sans leading-relaxed pt-1">{selectedEvent.terms}</div>
              </div>

              <div className="p-3.5 bg-slate-950/60 rounded border border-slate-800 space-y-1">
                <div className="text-slate-500 uppercase font-semibold">Tax Treatment (Income Tax Act)</div>
                <div className="text-slate-200 font-sans leading-relaxed pt-1">{selectedEvent.taxAngle}</div>
              </div>

              <div className="p-3.5 bg-slate-950/60 rounded border border-slate-800 space-y-1">
                <div className="text-slate-500 uppercase font-semibold">Valuation & EPS Impact</div>
                <div className="text-slate-200 font-sans leading-relaxed pt-1">{selectedEvent.valuationImpact}</div>
              </div>

              <div className="p-3.5 bg-slate-950/60 rounded border border-slate-800 space-y-1">
                <div className="text-slate-500 uppercase font-semibold">Statutory & Regulatory Approvals</div>
                <div className="text-slate-200 font-sans leading-relaxed pt-1">{selectedEvent.regulatoryApprovals}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded border border-slate-800">
              <div className="text-xs font-mono text-emerald-400 font-bold mb-1">Analytical Assessment</div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {selectedEvent.assessment}
              </p>
            </div>
          </div>
        </div>
      )}

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
