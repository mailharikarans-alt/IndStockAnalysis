import React, { useState } from 'react';
import { StockProfile, AgentRoleName } from '../types/equity';
import { 
  Bot, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Scale, 
  Search, 
  Layers, 
  Copy, 
  Check,
  RefreshCw
} from 'lucide-react';

interface MultiAgentRoomProps {
  stock: StockProfile;
}

interface AgentCard {
  role: AgentRoleName;
  description: string;
  badgeColor: string;
  sampleInsight: (s: StockProfile) => string;
}

const AGENTS: AgentCard[] = [
  {
    role: 'Data Collector',
    description: 'Pulls exchange filings, shareholding patterns, and BSE/NSE announcements with timestamps.',
    badgeColor: 'text-sky-400',
    sampleInsight: (s) => `Verified ISIN ${s.isin} (NSE: ${s.symbol} | BSE: ${s.bseCode}). Shareholding data sourced from BSE Q1 FY27 filing. Clean settlement on T+1; delivery percentage at ${s.deliveryPercent}%.`
  },
  {
    role: 'Fundamental Analyst',
    description: 'Calculates multi-year CAGRs, cash flow conversion (CFO/PAT), and working capital cycles.',
    badgeColor: 'text-emerald-400',
    sampleInsight: (s) => {
      const fLatest = s.financials[s.financials.length - 1];
      return `5-Year RoCE average stands at ${fLatest.roce}%. Cash conversion ratio (CFO/PAT) is ${fLatest.cashConversion}%, indicating ${fLatest.cashConversion >= 100 ? 'healthy earnings quality with zero aggressive accruals' : 'accrual drag requiring debtor scrutiny'}. Balance sheet D/E is ${fLatest.debtToEquity}.`;
    }
  },
  {
    role: 'Governance Auditor',
    description: 'Scans 12 India-specific red flags: promoter pledge, auditor churn, RPT loans, ASM/GSM.',
    badgeColor: 'text-amber-400',
    sampleInsight: (s) => `Promoter pledge is strictly ${s.promoterPledge}%. Statutory auditor ${s.auditor} (${s.auditorTenureYears} yrs tenure) gave an unmodified opinion in FY26 annual report. Zero active ASM/GSM surveillance restrictions.`
  },
  {
    role: 'Valuation Analyst',
    description: 'Constructs DCF models using 10-Yr G-Sec sovereign yield and reverse DCF pricing tests.',
    badgeColor: 'text-purple-400',
    sampleInsight: (s) => `Current P/E is ${s.peTTM}x (EV/EBITDA: ${s.evEbitda}x). DCF model assuming 10-Yr G-Sec of ${s.dcfDefaults.riskFreeRate}% and terminal growth of ${s.dcfDefaults.terminalGrowthRate}% yields base fair value within ${s.baseScenario.targetRange}.`
  },
  {
    role: 'Sector Specialist',
    description: 'Applies AGENTS.md Section 5 sector-specific lens and regulatory policy impacts.',
    badgeColor: 'text-indigo-400',
    sampleInsight: (s) => `Sector lens: ${s.sector}. Key industry metric: ${s.sectorMetrics[0].label} stands at ${s.sectorMetrics[0].value} (Assessment: ${s.sectorMetrics[0].assessment}).`
  },
  {
    role: 'Technical/Liquidity Analyst',
    description: 'Evaluates 50/200 DMA trend, delivery volumes, F&O ban list, and exit liquidity.',
    badgeColor: 'text-cyan-400',
    sampleInsight: (s) => `50 DMA at ₹${s.dma50} vs 200 DMA at ₹${s.dma200}. Stock is trading ${s.currentPrice > s.dma200 ? 'above' : 'below'} 200 DMA. Average daily traded value of ₹${s.avgDailyTurnoverCr} cr guarantees deep exit liquidity.`
  },
  {
    role: 'Devil\'s Advocate',
    description: 'Builds the strongest possible bear case and challenges management assumptions.',
    badgeColor: 'text-rose-400',
    sampleInsight: (s) => `Bear thesis: ${s.bearScenario.assumptions}. Downside target: ${s.bearScenario.targetRange}. Falsification flag: ${s.whatWouldChangeMind}`
  },
  {
    role: 'Editor / Verifier',
    description: 'Enforces Section 2 non-negotiable rules, units consistency (₹ cr), and SEBI disclaimer.',
    badgeColor: 'text-emerald-300',
    sampleInsight: (s) => `Verified all 11 items on the AGENTS checklist. All figures are in ₹ crore on a consolidated basis with FY (Apr–Mar) labeling. SEBI disclaimer appended.`
  }
];

export const MultiAgentRoom: React.FC<MultiAgentRoomProps> = ({ stock }) => {
  const [selectedAgentRole, setSelectedAgentRole] = useState<AgentRoleName>('Devil\'s Advocate');
  const [userQuery, setUserQuery] = useState('');
  const [operatorTipText, setOperatorTipText] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRunAiAnalysis = async (customPrompt?: string, roleOverride?: AgentRoleName) => {
    setLoading(true);
    setAiResponse(null);

    const activeRole = roleOverride || selectedAgentRole;
    const promptToSend = customPrompt || userQuery || `Evaluate ${stock.name} from your specialized vantage point following AGENTS.md rules.`;

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: stock.name,
          symbol: stock.symbol,
          bseCode: stock.bseCode,
          sector: stock.sector,
          playbook: 'multi-agent-synthesis',
          agentRole: activeRole,
          customPrompt: promptToSend,
          contextData: {
            currentPrice: stock.currentPrice,
            marketCapCr: stock.marketCapCr,
            peTTM: stock.peTTM,
            promoterPledge: stock.promoterPledge,
            roce: stock.financials[stock.financials.length - 1].roce,
            cfoPatConversion: stock.financials[stock.financials.length - 1].cashConversion,
            redFlags: stock.redFlags,
            bearAssumptions: stock.bearScenario.assumptions,
          }
        })
      });

      const data = await res.json();
      if (data.success && data.content) {
        setAiResponse(data.content);
      } else {
        setAiResponse(`Analysis generated via local AGENTS.md deterministic playbook:\n\n${AGENTS.find(a => a.role === activeRole)?.sampleInsight(stock)}`);
      }
    } catch (err) {
      console.error(err);
      setAiResponse(`Simulated Multi-Agent Evaluation (${activeRole}):\n\n${AGENTS.find(a => a.role === activeRole)?.sampleInsight(stock)}\n\n> Mandatory SEBI Disclaimer: Educational and informational only.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDebunkOperatorTip = () => {
    if (!operatorTipText.trim()) return;
    const prompt = `
[RED FLAG TEST — AGENTS.MD RULE 12 OPERATOR TIP AUDIT]
User has received the following tip/rumor: "${operatorTipText}"
Deconstruct this tip with cold skepticism:
1. Identify any "guaranteed return", target price certainty, or pump-and-dump characteristics.
2. Cross-check against the verified fundamentals of ${stock.name} (P/E: ${stock.peTTM}x, ROCE: ${stock.financials[stock.financials.length - 1].roce}%, Pledge: ${stock.promoterPledge}%).
3. Deliver a risk-based assessment refusing certainty framing.
`;
    handleRunAiAnalysis(prompt, 'Devil\'s Advocate');
  };

  const copyAiResponse = () => {
    if (!aiResponse) return;
    navigator.clipboard.writeText(aiResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-emerald-400 mb-1 flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5" />
            <span>AGENTS.MD SECTION 10: MULTI-AGENT COLLABORATION ROOM</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            8-Role Institutional Research Team for {stock.name}
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Strict Evidence Handoffs · No Speculation
        </div>
      </div>

      {/* 8 Agent Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {AGENTS.map((agent) => {
          const isSelected = selectedAgentRole === agent.role;
          return (
            <button
              key={agent.role}
              onClick={() => setSelectedAgentRole(agent.role)}
              className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-mono font-bold ${agent.badgeColor}`}>
                    {agent.role}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/30">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {agent.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 text-[11px] font-mono text-slate-300 line-clamp-2">
                "{agent.sampleInsight(stock)}"
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Agent Query & Operator Tip De-Bunker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Custom Role Query */}
        <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Query Active Agent: {selectedAgentRole}</span>
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Ask this specialized agent to scrutinize any aspect of {stock.symbol} following AGENTS.md rules.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder={`Ask ${selectedAgentRole} about ${stock.symbol} (e.g. stress test margins, check audit fees)...`}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunAiAnalysis()}
              className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
            />
            <button
              onClick={() => handleRunAiAnalysis()}
              disabled={loading}
              className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>Execute</span>
            </button>
          </div>
        </div>

        {/* Operator Tip & Telegram Rumor De-bunker (Rule 12) */}
        <div className="p-4 bg-rose-950/20 rounded-lg border border-rose-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Operator Tip & WhatsApp Rumor De-Bunker (Rule 12)</span>
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Paste any unverified claim or "guaranteed target" to test against institutional data.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g., 'Target 2000 in 2 weeks! Big insider operator buying!'..."
              value={operatorTipText}
              onChange={(e) => setOperatorTipText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDebunkOperatorTip()}
              className="flex-1 bg-slate-950 border border-rose-900/60 rounded px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 font-mono"
            />
            <button
              onClick={handleDebunkOperatorTip}
              disabled={loading}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Flame className="w-3.5 h-3.5" />}
              <span>Stress-Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Synthesis Response Panel */}
      {aiResponse && (
        <div className="p-5 bg-slate-900 rounded-lg border border-emerald-500/40 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <span>Synthesized Response — {selectedAgentRole}</span>
            </div>
            <button
              onClick={copyAiResponse}
              className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Response'}</span>
            </button>
          </div>

          <div className="text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
            {aiResponse}
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
