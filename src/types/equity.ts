export type MarketCapBucket = 'Large Cap' | 'Mid Cap' | 'Small Cap' | 'Micro Cap' | 'SME';

export type SectorType = 
  | 'Banks'
  | 'NBFCs / HFCs'
  | 'IT Services'
  | 'Auto & Ancillaries'
  | 'Capital Goods / Infra / Defence'
  | 'Pharma / Healthcare'
  | 'FMCG / Consumer'
  | 'Metals / Cement / Chemicals'
  | 'Renewables'
  | 'AMCs / Brokers / Exchanges';

export interface FinancialYearRow {
  year: string;
  revenueCr: number;
  ebitdaCr: number;
  ebitdaMargin: number; // percentage e.g. 24.5
  patCr: number;
  patMargin: number;
  cfoCr: number; // Cash Flow from Operations
  capexCr: number;
  fcfCr: number; // Free Cash Flow = CFO - Capex
  roe: number;
  roce: number;
  debtToEquity: number;
  debtorDays: number;
  cashConversion: number; // CFO / PAT %
}

export interface QuarterlyRow {
  quarter: string;
  revenueCr: number;
  yoyRevenueGrowth: number;
  qoqRevenueGrowth: number;
  ebitdaMargin: number;
  patCr: number;
  yoyPatGrowth: number;
  qoqPatGrowth: number;
  oneOffsOrSurprise?: string;
  concallHighlight: string;
}

export interface RedFlagCheck {
  id: string;
  title: string;
  status: 'clean' | 'watch' | 'flag';
  details: string;
  source: string;
}

export interface PeerMetric {
  name: string;
  symbol: string;
  marketCapCr: number;
  peTTM: number;
  evEbitda: number;
  roce5YrAvg: number;
  patCagr3Yr: number;
  promoterPledge: number;
  debtToEquity: number;
}

export interface DCFModelInputs {
  currentPrice: number;
  riskFreeRate: number; // 10-Yr G-Sec (e.g. 6.85%)
  equityRiskPremium: number; // e.g. 5.5%
  beta: number; // e.g. 1.10
  costOfDebt: number; // e.g. 8.5%
  debtWeight: number; // e.g. 15%
  equityWeight: number; // e.g. 85%
  taxRate: number; // e.g. 25.17%
  fiveYearRevGrowth: number; // e.g. 14%
  operatingMargin: number; // e.g. 22%
  terminalGrowthRate: number; // e.g. 5.0%
}

export interface SectorMetricItem {
  label: string;
  value: string;
  benchmark?: string;
  assessment: string;
}

export interface StockProfile {
  id: string;
  name: string;
  symbol: string; // NSE
  bseCode: string; // BSE Scrip
  isin: string;
  sector: SectorType;
  marketCapBucket: MarketCapBucket;
  listingStatus: 'Mainboard' | 'SME' | 'T2T';
  asOfDate: string;
  
  // Market Snapshot
  currentPrice: number;
  marketCapCr: number;
  freeFloatCr: number;
  high52w: number;
  low52w: number;
  peTTM: number;
  pbRatio: number;
  evEbitda: number;
  dividendYield: number;
  avgDailyTurnoverCr: number;
  deliveryPercent: number;
  circuitBand: string;
  asmGsmStatus: string;
  dma50: number;
  dma200: number;
  
  // Governance & Shareholding
  promoterHolding: number;
  promoterPledge: number; // 0 if clean
  fiiHolding: number;
  diiHolding: number;
  publicHolding: number;
  auditor: string;
  auditorTenureYears: number;
  auditorQualifications: string;
  
  // Core Thesis & Moat
  moatType: string;
  businessDescription: string;
  revenueMix: { segment: string; percentage: number }[];
  moatDrivers: string[];
  
  // Financials
  financials: FinancialYearRow[];
  quarterlies: QuarterlyRow[];
  sectorMetrics: SectorMetricItem[];
  redFlags: RedFlagCheck[];
  peers: PeerMetric[];
  
  // Scenarios
  bearScenario: {
    targetRange: string;
    assumptions: string;
    downsideRisk: string;
  };
  baseScenario: {
    targetRange: string;
    assumptions: string;
    thesisDrivers: string;
  };
  bullScenario: {
    targetRange: string;
    assumptions: string;
    upsideTriggers: string;
  };

  catalysts: string[];
  risks: string[];
  bottomLineAssessment: string;
  whatWouldChangeMind: string;
  
  dcfDefaults: DCFModelInputs;
  sources: { title: string; period: string; type: string }[];
}

export type PlaybookType = 
  | 'quick-screen'
  | 'deep-dive'
  | 'quarterly-review'
  | 'peer-comparison'
  | 'watchlist-scanner'
  | 'screen-builder'
  | 'ipo-analyzer'
  | 'event-analyzer'
  | 'multi-agent-room';

export type AgentRoleName =
  | 'Data Collector'
  | 'Fundamental Analyst'
  | 'Governance Auditor'
  | 'Valuation Analyst'
  | 'Sector Specialist'
  | 'Technical/Liquidity Analyst'
  | 'Devil\'s Advocate'
  | 'Editor / Verifier';
