export interface IPOAnalysisItem {
  id: string;
  companyName: string;
  sector: string;
  issueDates: string;
  priceBand: string;
  issueSizeCr: number;
  freshIssueCr: number;
  ofsCr: number;
  ofsPromoterPercent: number;
  anchorInvestors: string[];
  peMultipleAtCap: number;
  peerAveragePe: number;
  objectsOfIssue: string[];
  drhpRedFlags: string[];
  gmpWarningNotice: string;
  verdict: 'Avoid / High Risk' | 'Neutral / Watch' | 'Subscribe with Long-term Horizon';
  verdictReason: string;
}

export interface CorporateEventItem {
  id: string;
  companyName: string;
  ticker: string;
  eventType: 'Demerger' | 'Buyback' | 'Rights Issue' | 'QIP' | 'Stock Split & Bonus';
  recordDate: string;
  terms: string;
  whoBenefits: 'Promoter Advantaged' | 'Balanced / Win-Win' | 'Minority Friendly';
  taxAngle: string;
  valuationImpact: string;
  regulatoryApprovals: string;
  assessment: string;
}

export const MOCK_IPOS: IPOAnalysisItem[] = [
  {
    id: 'hdb-fin',
    companyName: 'HDB Financial Services Limited',
    sector: 'NBFCs / Retail Lending',
    issueDates: 'Tentative Q3 FY27',
    priceBand: '₹740 – ₹780 (Expected)',
    issueSizeCr: 12500,
    freshIssueCr: 2500,
    ofsCr: 10000,
    ofsPromoterPercent: 80.0,
    anchorInvestors: ['GIC Singapore', 'SBI Mutual Fund', 'Capital World', 'ICICI Prudential MF'],
    peMultipleAtCap: 26.5,
    peerAveragePe: 29.8,
    objectsOfIssue: [
      '₹2,500 cr Fresh issue to augment Tier-1 capital base for forward retail asset growth',
      '₹10,000 cr OFS by parent HDFC Bank Ltd to comply with RBI scale-based regulation (SBR)'
    ],
    drhpRedFlags: [
      'Unsecured personal loan portfolio slippage in tier-2/3 geographies increased to 2.8%',
      'Dependency on parent HDFC Bank brand franchise and co-located branch infrastructure'
    ],
    gmpWarningNotice: 'Grey Market Premium (GMP) is unregulated and prone to speculative circular trades; not evidence of fundamental quality or long-term fair value.',
    verdict: 'Subscribe with Long-term Horizon',
    verdictReason: 'Quality NBFC franchise with conservative provisioning, solid parentage, and reasonable valuation relative to peers like Cholamandalam and Bajaj Finance.'
  },
  {
    id: 'swiggy',
    companyName: 'Swiggy Limited',
    sector: 'Internet / Consumer Tech',
    issueDates: 'Q3 FY26 (Post-listing analysis)',
    priceBand: '₹371 – ₹390',
    issueSizeCr: 11327,
    freshIssueCr: 4499,
    ofsCr: 6828,
    ofsPromoterPercent: 60.3,
    anchorInvestors: ['BlackRock', 'CPPIB', 'Fidelity', 'Nippon India MF'],
    peMultipleAtCap: -1, // Negative earnings at IPO
    peerAveragePe: 85.0, // Zomato forward P/E
    objectsOfIssue: [
      '₹1,178 cr Investment in Instamart dark-store expansion and quick-commerce network',
      '₹1,003 cr Cloud infrastructure and brand marketing promotion',
      'General corporate purposes and inorganic tuck-ins'
    ],
    drhpRedFlags: [
      'Consolidated net loss of ₹2,350 cr in FY24; quick commerce unit economics still negative at EBITDA level',
      'Intensifying 10-minute delivery competition against Zepto and Blinkit with price discounting'
    ],
    gmpWarningNotice: 'Early listing day gains driven by secondary market momentum; cash burn requires close quarterly monitoring.',
    verdict: 'Neutral / Watch',
    verdictReason: 'Significant quick commerce opportunity, but path to consolidated profitability lags chief peer Zomato; wait for 2 quarters of post-IPO execution evidence.'
  }
];

export const MOCK_CORPORATE_EVENTS: CorporateEventItem[] = [
  {
    id: 'ev-1',
    companyName: 'Tata Motors Demerger (CV vs PV + JLR)',
    ticker: 'TATAMOTORS',
    eventType: 'Demerger',
    recordDate: 'Target H2 FY27',
    terms: '1:1 ratio. Every 1 share of Tata Motors yields 1 share of listed CV Co. and 1 share of listed PV+JLR Co.',
    whoBenefits: 'Minority Friendly',
    taxAngle: 'Tax-neutral under Section 47(vi) of the Income Tax Act for domestic shareholders; cost of acquisition apportioned based on net asset value.',
    valuationImpact: 'Eliminates historical 15–20% conglomerate holding discount. Allows dedicated institutional investors (CV cycle specialists vs luxury EV investors) to price entities independently.',
    regulatoryApprovals: 'Approved by Board; NCLT, SEBI, and shareholder majority voting under process.',
    assessment: '[ASSESSMENT] Value accretive corporate restructuring providing cleaner capital allocation and distinct dividend policies for commercial vs passenger mobility.'
  },
  {
    id: 'ev-2',
    companyName: 'Larsen & Toubro Share Buyback',
    ticker: 'LT',
    eventType: 'Buyback',
    recordDate: 'September 2023 (Historical Reference)',
    terms: 'Tender offer of ₹10,000 cr at ₹3,200 per share (premium of 10% to prevailing market price).',
    whoBenefits: 'Balanced / Win-Win',
    taxAngle: 'Historically taxed at company level under Section 115QA (now updated under Finance Act 2024 to dividend taxation in hands of recipients with capital loss adjustment).',
    valuationImpact: 'Reduced equity share capital by ~2.1%, expanding forward EPS and Return on Equity (RoE) by 45 bps.',
    regulatoryApprovals: 'SEBI Buyback Regulations 2018; 100% compliant with clean capital deployment.',
    assessment: '[ASSESSMENT] Exemplary capital allocation demonstrating management confidence and return of surplus EPC cash flows to long-term shareholders.'
  }
];
