import { StockProfile } from '../types/equity';

export const MOCK_STOCKS: StockProfile[] = [
  {
    id: 'lt',
    name: 'Larsen & Toubro Limited',
    symbol: 'LT',
    bseCode: '500510',
    isin: 'INE018A01030',
    sector: 'Capital Goods / Infra / Defence',
    marketCapBucket: 'Large Cap',
    listingStatus: 'Mainboard',
    asOfDate: '14 Oct 2026',
    currentPrice: 3580.00,
    marketCapCr: 492140,
    freeFloatCr: 393710,
    high52w: 3948.60,
    low52w: 2980.20,
    peTTM: 32.8,
    pbRatio: 4.85,
    evEbitda: 18.2,
    dividendYield: 0.95,
    avgDailyTurnoverCr: 485.4,
    deliveryPercent: 62.4,
    circuitBand: 'Dynamic (F&O eligible)',
    asmGsmStatus: 'None (Clean)',
    dma50: 3620.40,
    dma200: 3450.80,

    promoterHolding: 0.00, // Widely held institutionally, no individual promoter
    promoterPledge: 0.00,
    fiiHolding: 23.45,
    diiHolding: 42.12,
    publicHolding: 34.43,
    auditor: 'Deloitte Haskins & Sells LLP',
    auditorTenureYears: 7,
    auditorQualifications: 'Unmodified / Clean Opinion (FY26 Annual Report)',

    moatType: 'Scale, EPC Execution Track Record & Defence/Nuclear Moat',
    businessDescription: 'India’s premier infrastructure and heavy engineering conglomerate with leadership in EPC (transportation, hydrocarbon, renewables, heavy civil, power transmission) and advanced high-tech manufacturing (missile launchers, submarines, aerospace components).',
    revenueMix: [
      { segment: 'Infrastructure EPC', percentage: 52 },
      { segment: 'Energy & Hydrocarbon', percentage: 17 },
      { segment: 'IT & Technology Services (LTIMindtree/LTTS)', percentage: 19 },
      { segment: 'Hi-Tech Defence & Precision Engg', percentage: 7 },
      { segment: 'Development Projects & Others', percentage: 5 },
    ],
    moatDrivers: [
      'Record consolidated order book surpassing ₹5,10,000 crore (~2.3x TTM revenues)',
      'Pre-qualification capability for mega complex projects (bullet train, offshore gas, nuclear reactors)',
      'Disciplined working capital management and return on capital focus under Lakshya 2026 strategic plan'
    ],

    financials: [
      { year: 'FY22', revenueCr: 156521, ebitdaCr: 18220, ebitdaMargin: 11.6, patCr: 8669, patMargin: 5.5, cfoCr: 16120, capexCr: 4120, fcfCr: 12000, roe: 12.2, roce: 13.8, debtToEquity: 1.18, debtorDays: 98, cashConversion: 185.9 },
      { year: 'FY23', revenueCr: 183341, ebitdaCr: 20753, ebitdaMargin: 11.3, patCr: 10471, patMargin: 5.7, cfoCr: 17400, capexCr: 3890, fcfCr: 13510, roe: 13.5, roce: 14.6, debtToEquity: 1.05, debtorDays: 94, cashConversion: 166.2 },
      { year: 'FY24', revenueCr: 221113, ebitdaCr: 23640, ebitdaMargin: 10.7, patCr: 13059, patMargin: 5.9, cfoCr: 22800, capexCr: 4500, fcfCr: 18300, roe: 15.3, roce: 16.1, debtToEquity: 0.94, debtorDays: 91, cashConversion: 174.6 },
      { year: 'FY25', revenueCr: 254200, ebitdaCr: 27962, ebitdaMargin: 11.0, patCr: 15120, patMargin: 5.9, cfoCr: 26100, capexCr: 5200, fcfCr: 20900, roe: 16.2, roce: 17.4, debtToEquity: 0.82, debtorDays: 88, cashConversion: 172.6 },
      { year: 'FY26', revenueCr: 289400, ebitdaCr: 32700, ebitdaMargin: 11.3, patCr: 17850, patMargin: 6.2, cfoCr: 31200, capexCr: 5800, fcfCr: 25400, roe: 17.5, roce: 18.8, debtToEquity: 0.74, debtorDays: 85, cashConversion: 174.8 },
      { year: 'TTM', revenueCr: 304200, ebitdaCr: 34680, ebitdaMargin: 11.4, patCr: 19120, patMargin: 6.3, cfoCr: 33400, capexCr: 6100, fcfCr: 27300, roe: 17.9, roce: 19.1, debtToEquity: 0.70, debtorDays: 84, cashConversion: 174.7 }
    ],

    quarterlies: [
      { quarter: 'Q2 FY26', revenueCr: 61555, yoyRevenueGrowth: 15.2, qoqRevenueGrowth: 4.8, ebitdaMargin: 10.9, patCr: 3820, yoyPatGrowth: 18.5, qoqPatGrowth: 6.2, concallHighlight: 'Core EPC order inflow grew 21% YoY; international Middle East orders remain buoyant.' },
      { quarter: 'Q3 FY26', revenueCr: 71200, yoyRevenueGrowth: 16.8, qoqRevenueGrowth: 15.7, ebitdaMargin: 11.4, patCr: 4410, yoyPatGrowth: 22.1, qoqPatGrowth: 15.4, concallHighlight: 'Supply chain friction eased in Hydrocarbon segment; margins stabilized.' },
      { quarter: 'Q4 FY26', revenueCr: 88450, yoyRevenueGrowth: 18.1, qoqRevenueGrowth: 24.2, ebitdaMargin: 12.1, patCr: 5620, yoyPatGrowth: 21.0, qoqPatGrowth: 27.4, concallHighlight: 'Record Q4 execution sprint; net working capital reduced to 12.2% of revenues.' },
      { quarter: 'Q1 FY27', revenueCr: 68200, yoyRevenueGrowth: 14.5, qoqRevenueGrowth: -22.9, ebitdaMargin: 11.0, patCr: 3950, yoyPatGrowth: 17.2, qoqPatGrowth: -29.7, concallHighlight: 'Q1 monsoon slowdown typical seasonal pattern; order pipeline for FY27 guided at ₹3.8 lakh crore.' }
    ],

    sectorMetrics: [
      { label: 'Consolidated Order Book', value: '₹5,14,200 cr', benchmark: '> ₹4,50,000 cr', assessment: 'Strong visibility of ~2.4 years of forward EPC revenues.' },
      { label: 'Book-to-Bill Ratio', value: '2.38x', benchmark: '1.80x - 2.50x', assessment: 'Robust pipeline shielding against private capex lumpiness.' },
      { label: 'Net Working Capital % Rev', value: '12.4%', benchmark: '< 15.0%', assessment: 'Healthy cash conversion cycle despite public sector client base.' },
      { label: 'Middle East Order Share', value: '38.2%', benchmark: '< 45.0%', assessment: 'High Aramco / GCC exposure; monitor regional geopolitical stability.' }
    ],

    redFlags: [
      { id: 'rf-1', title: 'Promoter Pledge', status: 'clean', details: 'Zero promoter holding (professionally managed institutional company with zero pledge).', source: 'BSE Shareholding Filing Jun 2026' },
      { id: 'rf-2', title: 'Auditor Resignation / Qualification', status: 'clean', details: 'Deloitte Haskins & Sells LLP issued unqualified clean audit reports across FY24-FY26.', source: 'L&T Annual Report FY26' },
      { id: 'rf-3', title: 'CFO to PAT Cash Conversion', status: 'clean', details: 'Consolidated CFO consistently exceeds 150% of PAT over 5 years due to depreciation & non-cash items.', source: 'Consolidated Cash Flow Statements' },
      { id: 'rf-4', title: 'Loans to Related Parties', status: 'clean', details: 'No off-market loans to promoter entities. All intra-group transactions strictly with listed operating subsidiaries (LTIMindtree, LTTS).', source: 'L&T RPT Disclosures FY26' },
      { id: 'rf-5', title: 'ASM / GSM Framework', status: 'clean', details: 'Mainboard constituent of Nifty 50; no surveillance actions.', source: 'NSE Surveillance Notices' },
      { id: 'rf-6', title: 'Litigation / Contingent Liabilities', status: 'watch', details: 'Contingent liabilities of ₹14,200 cr (primarily performance bank guarantees for mega infrastructure tenders). Standard for EPC.', source: 'FY26 Notes to Accounts Note 38' },
      { id: 'rf-7', title: 'Operator / Social Media Hype', status: 'clean', details: 'Institutional ownership >65%; heavy institutional analyst coverage, no operator pump risk.', source: 'NSE Institutional Ownership Pattern' }
    ],

    peers: [
      { name: 'Larsen & Toubro', symbol: 'LT', marketCapCr: 492140, peTTM: 32.8, evEbitda: 18.2, roce5YrAvg: 16.8, patCagr3Yr: 19.4, promoterPledge: 0.0, debtToEquity: 0.74 },
      { name: 'Bharat Electronics', symbol: 'BEL', marketCapCr: 218400, peTTM: 44.5, evEbitda: 31.2, roce5YrAvg: 28.4, patCagr3Yr: 26.2, promoterPledge: 0.0, debtToEquity: 0.00 },
      { name: 'Siemens India', symbol: 'SIEMENS', marketCapCr: 245300, peTTM: 68.2, evEbitda: 48.5, roce5YrAvg: 21.2, patCagr3Yr: 28.5, promoterPledge: 0.0, debtToEquity: 0.02 },
      { name: 'ABB India', symbol: 'ABB', marketCapCr: 168900, peTTM: 74.1, evEbitda: 52.4, roce5YrAvg: 24.6, patCagr3Yr: 31.0, promoterPledge: 0.0, debtToEquity: 0.01 },
      { name: 'Thermax', symbol: 'THERMAX', marketCapCr: 54200, peTTM: 58.4, evEbitda: 36.8, roce5YrAvg: 17.5, patCagr3Yr: 22.1, promoterPledge: 0.0, debtToEquity: 0.04 }
    ],

    bearScenario: {
      targetRange: '₹2,850 – ₹3,050',
      assumptions: 'Middle East capex deceleration (crude < $60/bbl), domestic tender delays post-budget, margin compression to 9.8% due to input price inflation.',
      downsideRisk: '15% – 20% drawdown if working capital stretches past 16% of sales.'
    },
    baseScenario: {
      targetRange: '₹3,750 – ₹3,950',
      assumptions: 'Revenue CAGR of 13.5% over FY26-FY29, operating margin stable at 11.2%, return on equity sustaining above 17.5%. P/E multiple at 30x forward.',
      thesisDrivers: 'Execution of massive ₹5.1 lakh cr order book + monetization of non-core assets (Hyderabad Metro refinancing).'
    },
    bullScenario: {
      targetRange: '₹4,400 – ₹4,650',
      assumptions: 'Accelerated domestic capex revival, private capex inflecting in steel/cement/renewables, Middle East orders exceeding expectations, margin expansion to 12.5%.',
      upsideTriggers: 'Mega defence indigenous submarine orders, green hydrogen EPC scale-up, and potential re-rating to 35x.'
    },

    catalysts: [
      'Union Budget infrastructure allocation increases for railways, expressways, and water grids',
      'Award of Indian Navy Project-75I submarine tender (L&T and Navantia partnership)',
      'Value unlocking via Hyderabad Metro debt restructuring and viability gap funding release',
      'Strong Q2 FY27 order inflows from Saudi Aramco and UAE energy entities'
    ],
    risks: [
      'Geopolitical tensions in GCC disrupting Middle East project mobilization',
      'State government election cycles delaying milestone billings and payment certifications',
      'Volatility in raw material inputs (hot rolled steel, cement, copper) on fixed-price legacy packages',
      'Talent attrition and high wage inflation in IT subsidiaries (LTIMindtree)'
    ],
    bottomLineAssessment: 'Attractive on 1–3 year structural infrastructure upcycle with solid margin of safety derived from record order backlog, yet premium multiple requires monitoring working capital discipline and Middle East execution risks.',
    whatWouldChangeMind: 'Consolidated order inflows decelerating below 10% YoY for two consecutive quarters, or working capital ballooning above 16% of revenues indicating collection gridlock.',

    dcfDefaults: {
      currentPrice: 3580.00,
      riskFreeRate: 6.85,
      equityRiskPremium: 5.50,
      beta: 0.95,
      costOfDebt: 8.20,
      debtWeight: 15.0,
      equityWeight: 85.0,
      taxRate: 25.17,
      fiveYearRevGrowth: 13.5,
      operatingMargin: 11.5,
      terminalGrowthRate: 5.0
    },

    sources: [
      { title: 'L&T Consolidated Audited Financial Results Q1 FY27', period: 'Jul 2026', type: 'NSE Corporate Announcement' },
      { title: 'L&T Annual Report FY26', period: 'Apr 2026', type: 'Company IR Filing' },
      { title: 'CRISIL Corporate Credit Rating AAA/Stable', period: 'Nov 2025', type: 'Credit Rating Agency Report' },
      { title: 'BSE Shareholding Pattern Quarter ended June 2026', period: 'Jun 2026', type: 'Exchange Disclosure' }
    ]
  },
  {
    id: 'hdfcbank',
    name: 'HDFC Bank Limited',
    symbol: 'HDFCBANK',
    bseCode: '500180',
    isin: 'INE040A01034',
    sector: 'Banks',
    marketCapBucket: 'Large Cap',
    listingStatus: 'Mainboard',
    asOfDate: '14 Oct 2026',
    currentPrice: 1690.50,
    marketCapCr: 1288000,
    freeFloatCr: 966000,
    high52w: 1794.00,
    low52w: 1363.55,
    peTTM: 18.4,
    pbRatio: 2.65,
    evEbitda: 14.1,
    dividendYield: 1.25,
    avgDailyTurnoverCr: 1850.0,
    deliveryPercent: 68.2,
    circuitBand: 'Dynamic (F&O eligible)',
    asmGsmStatus: 'None (Clean)',
    dma50: 1675.20,
    dma200: 1610.40,

    promoterHolding: 0.00, // Post HDFC Ltd merger, zero promoter
    promoterPledge: 0.00,
    fiiHolding: 47.85,
    diiHolding: 34.20,
    publicHolding: 17.95,
    auditor: 'Price Waterhouse LLP & B S R & Co. LLP',
    auditorTenureYears: 5,
    auditorQualifications: 'Unmodified / Clean Opinion (FY26 Statutory Audit)',

    moatType: 'Low-Cost Retail Deposit Franchise & Distribution Network',
    businessDescription: 'India’s largest private sector bank following the reverse-merger with parent HDFC Ltd. Offers full-spectrum banking, mortgage loans, corporate finance, MSME credit, and capital market services through over 8,800 branches.',
    revenueMix: [
      { segment: 'Retail Banking & Mortgages', percentage: 54 },
      { segment: 'Wholesale & Corporate Banking', percentage: 28 },
      { segment: 'Treasury & Forex', percentage: 11 },
      { segment: 'Other Banking Operations', percentage: 7 },
    ],
    moatDrivers: [
      'Unrivalled branch reach (8,800+ branches) with sticky domestic liability franchise',
      'Best-in-class asset quality through multiple economic cycles (Gross NPA < 1.3%)',
      'Immense cross-sell synergy post-merger with HDFC mortgage customer base'
    ],

    financials: [
      { year: 'FY22', revenueCr: 157984, ebitdaCr: 65120, ebitdaMargin: 41.2, patCr: 36961, patMargin: 23.4, cfoCr: 41200, capexCr: 4100, fcfCr: 37100, roe: 16.9, roce: 15.8, debtToEquity: 6.8, debtorDays: 0, cashConversion: 111.4 },
      { year: 'FY23', revenueCr: 192800, ebitdaCr: 70404, ebitdaMargin: 36.5, patCr: 44108, patMargin: 22.9, cfoCr: 52100, capexCr: 4600, fcfCr: 47500, roe: 17.1, roce: 16.2, debtToEquity: 6.9, debtorDays: 0, cashConversion: 118.1 },
      { year: 'FY24', revenueCr: 315432, ebitdaCr: 98400, ebitdaMargin: 31.2, patCr: 60812, patMargin: 19.3, cfoCr: 74500, capexCr: 6200, fcfCr: 68300, roe: 15.5, roce: 14.8, debtToEquity: 7.2, debtorDays: 0, cashConversion: 122.5 },
      { year: 'FY25', revenueCr: 368000, ebitdaCr: 112000, ebitdaMargin: 30.4, patCr: 67200, patMargin: 18.3, cfoCr: 81200, capexCr: 6800, fcfCr: 74400, roe: 15.8, roce: 15.1, debtToEquity: 6.7, debtorDays: 0, cashConversion: 120.8 },
      { year: 'FY26', revenueCr: 412500, ebitdaCr: 128400, ebitdaMargin: 31.1, patCr: 74800, patMargin: 18.1, cfoCr: 90500, capexCr: 7100, fcfCr: 83400, roe: 16.4, roce: 15.6, debtToEquity: 6.3, debtorDays: 0, cashConversion: 121.0 },
      { year: 'TTM', revenueCr: 428000, ebitdaCr: 133500, ebitdaMargin: 31.2, patCr: 77200, patMargin: 18.0, cfoCr: 94000, capexCr: 7400, fcfCr: 86600, roe: 16.6, roce: 15.8, debtToEquity: 6.2, debtorDays: 0, cashConversion: 121.7 }
    ],

    quarterlies: [
      { quarter: 'Q2 FY26', revenueCr: 85200, yoyRevenueGrowth: 11.2, qoqRevenueGrowth: 2.8, ebitdaMargin: 30.8, patCr: 16820, yoyPatGrowth: 10.5, qoqPatGrowth: 3.8, concallHighlight: 'Credit-to-Deposit (LDR) ratio moderated to 98%; deposit mobilization focused via retail CASA.' },
      { quarter: 'Q3 FY26', revenueCr: 88400, yoyRevenueGrowth: 12.1, qoqRevenueGrowth: 3.7, ebitdaMargin: 31.2, patCr: 17450, yoyPatGrowth: 11.4, qoqPatGrowth: 3.7, concallHighlight: 'NIM held steady at 3.47%; retail loan growth outpaced wholesale.' },
      { quarter: 'Q4 FY26', revenueCr: 92800, yoyRevenueGrowth: 13.4, qoqRevenueGrowth: 5.0, ebitdaMargin: 31.6, patCr: 18600, yoyPatGrowth: 12.8, qoqPatGrowth: 6.6, concallHighlight: 'Gross NPA declined to 1.24%; provision coverage ratio sustained at 73.5%.' },
      { quarter: 'Q1 FY27', revenueCr: 91400, yoyRevenueGrowth: 9.8, qoqRevenueGrowth: -1.5, ebitdaMargin: 30.9, patCr: 17950, yoyPatGrowth: 10.8, qoqPatGrowth: -3.5, concallHighlight: 'Management reconfirms LDR glide-path to sub-90% over next 18 months.' }
    ],

    sectorMetrics: [
      { label: 'Net Interest Margin (NIM)', value: '3.48%', benchmark: '> 3.50%', assessment: 'Slight compression post-merger due to high-cost HDFC borrowings; gradual recovery underway.' },
      { label: 'CASA Ratio', value: '37.8%', benchmark: '> 40.0%', assessment: 'Deposit competition remains intense; retail CASA mobilization top strategic priority.' },
      { label: 'Gross NPA / Net NPA', value: '1.24% / 0.35%', benchmark: '< 2.0% / < 0.5%', assessment: 'Pristine credit underwriting with industry-leading low credit costs (45 bps).' },
      { label: 'Capital Adequacy (CET1 / CRAR)', value: '16.4% / 19.3%', benchmark: '> 11.5% / > 15.0%', assessment: 'Robust capital buffer with zero immediate dilution risk.' }
    ],

    redFlags: [
      { id: 'rf-1', title: 'Promoter Pledge', status: 'clean', details: 'Zero promoter holding / Zero pledge.', source: 'NSE Shareholding Pattern' },
      { id: 'rf-2', title: 'Auditor Disclosures', status: 'clean', details: 'Joint statutory auditors (PwC & BSR) issued unmodified reports.', source: 'FY26 Annual Accounts' },
      { id: 'rf-3', title: 'LDR (Credit to Deposit) Overhang', status: 'watch', details: 'Credit-Deposit ratio at 97% remains higher than historical 85% comfort band, slowing asset expansion.', source: 'RBI Pillar 3 Disclosures' },
      { id: 'rf-4', title: 'Regulatory Enforcement', status: 'clean', details: 'No active embargoes on digital launches or credit cards (previous RBI embargo resolved in 2022).', source: 'RBI Press Releases' },
      { id: 'rf-5', title: 'Related Party Advances', status: 'clean', details: 'Arms-length transactions with subsidiaries (HDB Financial, HDFC Life, HDFC AMC).', source: 'SEBI Disclosure Reports' }
    ],

    peers: [
      { name: 'HDFC Bank', symbol: 'HDFCBANK', marketCapCr: 1288000, peTTM: 18.4, evEbitda: 14.1, roce5YrAvg: 16.1, patCagr3Yr: 21.4, promoterPledge: 0.0, debtToEquity: 6.3 },
      { name: 'ICICI Bank', symbol: 'ICICIBANK', marketCapCr: 894000, peTTM: 17.2, evEbitda: 13.5, roce5YrAvg: 17.8, patCagr3Yr: 28.6, promoterPledge: 0.0, debtToEquity: 6.0 },
      { name: 'State Bank of India', symbol: 'SBIN', marketCapCr: 720000, peTTM: 10.8, evEbitda: 8.9, roce5YrAvg: 15.4, patCagr3Yr: 24.1, promoterPledge: 0.0, debtToEquity: 12.1 },
      { name: 'Kotak Mahindra Bank', symbol: 'KOTAKBANK', marketCapCr: 362000, peTTM: 21.5, evEbitda: 15.8, roce5YrAvg: 13.9, patCagr3Yr: 18.2, promoterPledge: 0.0, debtToEquity: 4.8 },
      { name: 'Axis Bank', symbol: 'AXISBANK', marketCapCr: 368000, peTTM: 13.9, evEbitda: 10.2, roce5YrAvg: 16.4, patCagr3Yr: 34.2, promoterPledge: 0.0, debtToEquity: 7.1 }
    ],

    bearScenario: {
      targetRange: '₹1,380 – ₹1,480',
      assumptions: 'Prolonged liquidity tightness forces elevated cost of deposits, compressing NIMs to 3.25%; credit growth capped at 10% YoY. Valuation de-rates to 2.1x P/B.',
      downsideRisk: '12% – 18% drawdown if deposit mobilization lags further.'
    },
    baseScenario: {
      targetRange: '₹1,850 – ₹1,980',
      assumptions: 'Loan growth stabilizes at 13-14% YoY, NIMs recover to 3.55% as high-cost HDFC Ltd bonds mature; RoE sustains at 16.8%. Valuation trades at historical median 2.8x P/B.',
      thesisDrivers: 'Successful digestion of HDFC merger, steady decline in LDR ratio, and sustained low credit costs.'
    },
    bullScenario: {
      targetRange: '₹2,200 – ₹2,350',
      assumptions: 'Retail CASA accelerates to 41%, NIMs expand to 3.75%, cross-selling of mortgages and insurance explodes; RoA crosses 2.1%. Re-rating towards 3.2x P/B.',
      upsideTriggers: 'Value unlocking from HDB Financial Services IPO and MSCI index weighting normalization.'
    },

    catalysts: [
      'HDB Financial Services IPO filing and listing (unlocking subsidiary value)',
      'Substantial run-off of high-cost legacy borrowings (₹1.2 lakh cr) lowering funding costs',
      'MSCI foreign inclusion factor increase triggering passive institutional inflows ($3–4B)',
      'RBI monetary easing boosting systemic deposit accretion'
    ],
    risks: [
      'Structural deposit war among commercial banks keeping cost of funds stubbornly elevated',
      'Unsecured personal loan and credit card slippage uptick across systemic retail credit',
      'Execution drag in branch expansion payback timelines'
    ],
    bottomLineAssessment: 'Attractive risk-reward on long-term compounder thesis; trading at a notable discount to historical 10-year average P/B multiple (2.6x vs historical 3.5x), offering a wide margin of safety.',
    whatWouldChangeMind: 'CASA ratio falling below 35% or Gross NPAs rising above 1.75% indicating breakdown in risk discipline post-merger.',

    dcfDefaults: {
      currentPrice: 1690.50,
      riskFreeRate: 6.85,
      equityRiskPremium: 5.50,
      beta: 0.90,
      costOfDebt: 7.80,
      debtWeight: 0.0, // Financial institutions modeled via P/B & Excess Return Model
      equityWeight: 100.0,
      taxRate: 25.17,
      fiveYearRevGrowth: 12.5,
      operatingMargin: 32.0,
      terminalGrowthRate: 5.5
    },

    sources: [
      { title: 'HDFC Bank Financial Results Q1 FY27', period: 'Jul 2026', type: 'NSE / BSE Submission' },
      { title: 'HDFC Bank Annual Report FY26', period: 'May 2026', type: 'Statutory Filing' },
      { title: 'RBI Quarterly Banking Statistics & LDR Data', period: 'Jun 2026', type: 'Central Bank Bulletin' },
      { title: 'BSE Shareholding Disclosure Q1 FY27', period: 'Jun 2026', type: 'Exchange Disclosure' }
    ]
  },
  {
    id: 'tatamotors',
    name: 'Tata Motors Limited',
    symbol: 'TATAMOTORS',
    bseCode: '500570',
    isin: 'INE155A01022',
    sector: 'Auto & Ancillaries',
    marketCapBucket: 'Large Cap',
    listingStatus: 'Mainboard',
    asOfDate: '14 Oct 2026',
    currentPrice: 945.20,
    marketCapCr: 347800,
    freeFloatCr: 187800,
    high52w: 1179.00,
    low52w: 865.00,
    peTTM: 10.9,
    pbRatio: 3.42,
    evEbitda: 4.8,
    dividendYield: 0.85,
    avgDailyTurnoverCr: 720.5,
    deliveryPercent: 48.6,
    circuitBand: 'Dynamic (F&O eligible)',
    asmGsmStatus: 'None (Clean)',
    dma50: 978.10,
    dma200: 995.40,

    promoterHolding: 46.36,
    promoterPledge: 0.00, // Reduced from historical peaks to 0%
    fiiHolding: 19.82,
    diiHolding: 16.45,
    publicHolding: 17.37,
    auditor: 'B S R & Co. LLP',
    auditorTenureYears: 6,
    auditorQualifications: 'Unmodified / Clean Opinion (FY26 Consolidated Report)',

    moatType: 'Commercial Vehicle Hegemony, JLR Luxury Portfolio & EV Market Leadership',
    businessDescription: 'Global automotive manufacturer comprising Jaguar Land Rover (Range Rover, Defender, Discovery, Jaguar), India Commercial Vehicles (market share >40%), and India Passenger Vehicles with undisputed dominance in electric vehicles (EV share >65%).',
    revenueMix: [
      { segment: 'Jaguar Land Rover (JLR)', percentage: 69 },
      { segment: 'India Commercial Vehicles (CV)', percentage: 17 },
      { segment: 'India Passenger Vehicles (PV & EV)', percentage: 13 },
      { segment: 'Vehicle Financing & Others', percentage: 1 },
    ],
    moatDrivers: [
      'Range Rover & Defender order backlog providing high-margin luxury cash flow engine',
      'Net auto debt reduction achieved to zero levels (Net cash balance sheet)',
      'Clear roadmap for corporate demerger into two separately listed pure-plays (CV vs PV+JLR)'
    ],

    financials: [
      { year: 'FY22', revenueCr: 278454, ebitdaCr: 24813, ebitdaMargin: 8.9, patCr: -11309, patMargin: -4.1, cfoCr: 14200, capexCr: 15400, fcfCr: -1200, roe: -24.5, roce: 4.2, debtToEquity: 3.10, debtorDays: 24, cashConversion: -125.6 },
      { year: 'FY23', revenueCr: 345967, ebitdaCr: 31830, ebitdaMargin: 9.2, patCr: 2690, patMargin: 0.8, cfoCr: 28900, capexCr: 16200, fcfCr: 12700, roe: 5.6, roce: 8.9, debtToEquity: 2.15, debtorDays: 22, cashConversion: 1074.3 },
      { year: 'FY24', revenueCr: 437928, ebitdaCr: 57237, ebitdaMargin: 13.1, patCr: 31807, patMargin: 7.3, cfoCr: 58200, capexCr: 21500, fcfCr: 36700, roe: 36.8, roce: 22.4, debtToEquity: 0.98, debtorDays: 19, cashConversion: 182.9 },
      { year: 'FY25', revenueCr: 468000, ebitdaCr: 63180, ebitdaMargin: 13.5, patCr: 33400, patMargin: 7.1, cfoCr: 61400, capexCr: 24000, fcfCr: 37400, roe: 31.5, roce: 23.1, debtToEquity: 0.35, debtorDays: 18, cashConversion: 183.8 },
      { year: 'FY26', revenueCr: 494500, ebitdaCr: 67250, ebitdaMargin: 13.6, patCr: 35100, patMargin: 7.1, cfoCr: 64500, capexCr: 25500, fcfCr: 39000, roe: 28.2, roce: 22.8, debtToEquity: 0.08, debtorDays: 18, cashConversion: 183.7 },
      { year: 'TTM', revenueCr: 504000, ebitdaCr: 68540, ebitdaMargin: 13.6, patCr: 35800, patMargin: 7.1, cfoCr: 65800, capexCr: 26000, fcfCr: 39800, roe: 27.5, roce: 22.4, debtToEquity: 0.05, debtorDays: 18, cashConversion: 183.8 }
    ],

    quarterlies: [
      { quarter: 'Q2 FY26', revenueCr: 118400, yoyRevenueGrowth: 8.5, qoqRevenueGrowth: 2.1, ebitdaMargin: 13.2, patCr: 7850, yoyPatGrowth: 11.2, qoqPatGrowth: 4.5, concallHighlight: 'JLR order book stood at 148,000 units; Range Rover and Defender comprise 72% of order bank.' },
      { quarter: 'Q3 FY26', revenueCr: 129500, yoyRevenueGrowth: 9.4, qoqRevenueGrowth: 9.4, ebitdaMargin: 13.8, patCr: 9120, yoyPatGrowth: 14.5, qoqPatGrowth: 16.2, concallHighlight: 'Domestic CV EBITDA margin expanded to 11.1%; fleet replacement demand healthy.' },
      { quarter: 'Q4 FY26', revenueCr: 138200, yoyRevenueGrowth: 10.2, qoqRevenueGrowth: 6.7, ebitdaMargin: 14.1, patCr: 10200, yoyPatGrowth: 15.8, qoqPatGrowth: 11.8, concallHighlight: 'Net auto debt officially turned net cash (+£300m at JLR); Board approved demerger scheme.' },
      { quarter: 'Q1 FY27', revenueCr: 117900, yoyRevenueGrowth: 6.4, qoqRevenueGrowth: -14.7, ebitdaMargin: 13.1, patCr: 8630, yoyPatGrowth: 9.5, qoqPatGrowth: -15.4, concallHighlight: 'Temporary supply bottleneck in European aluminium suppliers managed; full-year production target intact.' }
    ],

    sectorMetrics: [
      { label: 'JLR EBIT Margin', value: '8.8%', benchmark: '> 8.0%', assessment: 'Healthy luxury margin delivery supported by high ASP Range Rover Sport and SV trims.' },
      { label: 'Domestic EV Market Share', value: '66.4%', benchmark: '> 60.0%', assessment: 'Dominant position with Curvv.ev, Nexon.ev, and Punch.ev; facing upcoming OEM competition.' },
      { label: 'CV Industry Market Share', value: '41.2%', benchmark: '> 40.0%', assessment: 'Leadership sustained in MHCV segment; pricing discipline over market share discount war.' },
      { label: 'Net Auto Debt', value: 'Net Cash (₹4,200 cr)', benchmark: '< ₹10,000 cr', assessment: 'Spectacular turnaround from peak net auto debt of ₹61,000 cr in FY21.' }
    ],

    redFlags: [
      { id: 'rf-1', title: 'Promoter Pledge', status: 'clean', details: 'Promoter pledge reduced from historical 1.8% to strictly 0.00%.', source: 'NSE Shareholding Filing Jun 2026' },
      { id: 'rf-2', title: 'Debt Sustainability', status: 'clean', details: 'Achieved net cash balance sheet on auto business; interest coverage ratio > 9.5x.', source: 'Q1 FY27 Investor Presentation' },
      { id: 'rf-3', title: 'Auditor Disclosures', status: 'clean', details: 'BSR & Co. LLP issued unmodified reports; no qualifications or adverse remarks.', source: 'FY26 Consolidated Report' },
      { id: 'rf-4', title: 'Demerger Execution Risk', status: 'watch', details: 'Pending NCLT and shareholder approvals for splitting into CV and PV+JLR listed vehicles.', source: 'Stock Exchange Disclosures' }
    ],

    peers: [
      { name: 'Tata Motors', symbol: 'TATAMOTORS', marketCapCr: 347800, peTTM: 10.9, evEbitda: 4.8, roce5YrAvg: 16.4, patCagr3Yr: 42.1, promoterPledge: 0.0, debtToEquity: 0.08 },
      { name: 'Mahindra & Mahindra', symbol: 'M&M', marketCapCr: 362400, peTTM: 26.8, evEbitda: 18.4, roce5YrAvg: 19.5, patCagr3Yr: 28.4, promoterPledge: 0.1, debtToEquity: 0.45 },
      { name: 'Maruti Suzuki', symbol: 'MARUTI', marketCapCr: 395000, peTTM: 28.2, evEbitda: 17.5, roce5YrAvg: 16.8, patCagr3Yr: 38.5, promoterPledge: 0.0, debtToEquity: 0.01 },
      { name: 'Bajaj Auto', symbol: 'BAJAJ-AUTO', marketCapCr: 298000, peTTM: 34.2, evEbitda: 24.1, roce5YrAvg: 29.5, patCagr3Yr: 21.0, promoterPledge: 0.0, debtToEquity: 0.00 }
    ],

    bearScenario: {
      targetRange: '₹750 – ₹820',
      assumptions: 'European/US macroeconomic slowdown eroding JLR luxury order book; EV price war triggered by global entrants; CV domestic volume cyclical contraction (-8% YoY). Multiple compresses to 7.5x P/E.',
      downsideRisk: '15% – 20% drawdown under global luxury demand contraction.'
    },
    baseScenario: {
      targetRange: '₹1,050 – ₹1,150',
      assumptions: 'JLR sustaining 8.5% EBIT margins; domestic PV gaining share with Curvv & Sierra; CV margins holding >10.5%. Demerger unlocks conglomerate discount. Multiple at 11x forward P/E.',
      thesisDrivers: 'Zero net debt, high FCF generation (>₹25,000 cr/yr), and distinct investor base for CV vs PV.'
    },
    bullScenario: {
      targetRange: '₹1,300 – ₹1,420',
      assumptions: 'Global launch of all-electric Jaguar and Range Rover Electric creates massive waitlists; domestic EV subsidy stability and battery cost deflation; CV infrastructure cycle extends. Multiple expands to 13.5x.',
      upsideTriggers: 'Sum-of-the-parts value realization post-demerger and European battery gigafactory tax credits.'
    },

    catalysts: [
      'Completion of corporate demerger into two separately listed focused companies (H2 FY27)',
      'Launch of Range Rover Electric and global deliveries commencement',
      'Potential partial stake sale / IPO of Tata Passenger Electric Mobility (TPEM)',
      'Agratas battery gigafactory operationalization reducing imported cell costs'
    ],
    risks: [
      'Potential tariffs or trade friction on UK/European auto exports to US or China',
      'Intensified competition in domestic EV passenger car market from Hyundai, Mahindra, and BYD',
      'Cyclical peak in domestic commercial vehicle replacement cycle'
    ],
    bottomLineAssessment: 'Attractive valuation at ~10.9x TTM P/E with zero net auto debt and upcoming demerger catalyst, though cyclicality of global luxury auto and CV demand warrants a balanced stance.',
    whatWouldChangeMind: 'JLR wholesale volumes declining >15% YoY or cash burn returning due to unplanned EV architecture delays.',

    dcfDefaults: {
      currentPrice: 945.20,
      riskFreeRate: 6.85,
      equityRiskPremium: 5.50,
      beta: 1.25,
      costOfDebt: 8.50,
      debtWeight: 10.0,
      equityWeight: 90.0,
      taxRate: 25.17,
      fiveYearRevGrowth: 9.5,
      operatingMargin: 13.2,
      terminalGrowthRate: 4.5
    },

    sources: [
      { title: 'Tata Motors Q1 FY27 Earnings Release', period: 'Aug 2026', type: 'NSE / BSE Announcement' },
      { title: 'Tata Motors Integrated Annual Report FY26', period: 'Jun 2026', type: 'Statutory Filing' },
      { title: 'JLR Q1 FY27 Wholesale & Retail Investor Presentation', period: 'Jul 2026', type: 'Subsidiary Disclosure' },
      { title: 'Scheme of Demerger BSE Disclosure', period: 'Mar 2026', type: 'Regulatory Filing' }
    ]
  },
  {
    id: 'dixon',
    name: 'Dixon Technologies (India) Limited',
    symbol: 'DIXON',
    bseCode: '540699',
    isin: 'INE935N01020',
    sector: 'Capital Goods / Infra / Defence',
    marketCapBucket: 'Mid Cap',
    listingStatus: 'Mainboard',
    asOfDate: '14 Oct 2026',
    currentPrice: 12450.00,
    marketCapCr: 74600,
    freeFloatCr: 49200,
    high52w: 15480.00,
    low52w: 6920.00,
    peTTM: 82.5,
    pbRatio: 24.8,
    evEbitda: 46.2,
    dividendYield: 0.12,
    avgDailyTurnoverCr: 412.0,
    deliveryPercent: 41.2,
    circuitBand: 'Dynamic (F&O eligible)',
    asmGsmStatus: 'None (Clean)',
    dma50: 12900.00,
    dma200: 11150.00,

    promoterHolding: 33.72,
    promoterPledge: 0.00,
    fiiHolding: 21.40,
    diiHolding: 26.15,
    publicHolding: 18.73,
    auditor: 'S.N. Dhawan & CO LLP',
    auditorTenureYears: 5,
    auditorQualifications: 'Unmodified clean opinion',

    moatType: 'Scale in Electronics Manufacturing Services (EMS) & PLI Policy Alignment',
    businessDescription: 'Largest Indian EMS player engaged in manufacturing smartphones (Motorola, Xiaomi, Transsion), LED TVs, home appliances, telecom networking devices, and IT hardware under Production Linked Incentive (PLI) schemes.',
    revenueMix: [
      { segment: 'Mobile & EMS Division', percentage: 65 },
      { segment: 'Consumer Electronics (LED TV)', percentage: 16 },
      { segment: 'Home Appliances (Washing Machines)', percentage: 8 },
      { segment: 'Lighting & Telecom / IT Hardware', percentage: 11 },
    ],
    moatDrivers: [
      'Beneficiary of GoI PLI schemes for smartphones, telecom, and IT hardware',
      'Massive assembly volume scaling leading to component localization joint ventures (display, precision mechanicals)',
      'Sticky OEM partnerships with global smartphone brands transitioning supply chains out of China'
    ],

    financials: [
      { year: 'FY22', revenueCr: 10697, ebitdaCr: 379, ebitdaMargin: 3.5, patCr: 190, patMargin: 1.8, cfoCr: 210, capexCr: 360, fcfCr: -150, roe: 21.8, roce: 27.4, debtToEquity: 0.45, debtorDays: 48, cashConversion: 110.5 },
      { year: 'FY23', revenueCr: 12192, ebitdaCr: 517, ebitdaMargin: 4.2, patCr: 255, patMargin: 2.1, cfoCr: 540, capexCr: 410, fcfCr: 130, roe: 22.4, roce: 29.8, debtToEquity: 0.18, debtorDays: 44, cashConversion: 211.7 },
      { year: 'FY24', revenueCr: 17691, ebitdaCr: 712, ebitdaMargin: 4.0, patCr: 375, patMargin: 2.1, cfoCr: 780, capexCr: 520, fcfCr: 260, roe: 24.8, roce: 33.5, debtToEquity: 0.12, debtorDays: 40, cashConversion: 208.0 },
      { year: 'FY25', revenueCr: 28400, ebitdaCr: 1136, ebitdaMargin: 4.0, patCr: 620, patMargin: 2.2, cfoCr: 1210, capexCr: 750, fcfCr: 460, roe: 28.5, roce: 37.2, debtToEquity: 0.10, debtorDays: 38, cashConversion: 195.1 },
      { year: 'FY26', revenueCr: 41200, ebitdaCr: 1689, ebitdaMargin: 4.1, patCr: 904, patMargin: 2.2, cfoCr: 1650, capexCr: 880, fcfCr: 770, roe: 30.1, roce: 41.5, debtToEquity: 0.08, debtorDays: 36, cashConversion: 182.5 },
      { year: 'TTM', revenueCr: 46800, ebitdaCr: 1918, ebitdaMargin: 4.1, patCr: 1040, patMargin: 2.2, cfoCr: 1820, capexCr: 950, fcfCr: 870, roe: 31.0, roce: 42.1, debtToEquity: 0.07, debtorDays: 35, cashConversion: 175.0 }
    ],

    quarterlies: [
      { quarter: 'Q2 FY26', revenueCr: 9800, yoyRevenueGrowth: 78.4, qoqRevenueGrowth: 22.1, ebitdaMargin: 4.0, patCr: 215, yoyPatGrowth: 82.0, qoqPatGrowth: 26.5, concallHighlight: 'Smartphone monthly run rate touched 3.5 million units; Ismartu acquisition consolidated.' },
      { quarter: 'Q3 FY26', revenueCr: 11400, yoyRevenueGrowth: 84.2, qoqRevenueGrowth: 16.3, ebitdaMargin: 4.1, patCr: 254, yoyPatGrowth: 86.5, qoqPatGrowth: 18.1, concallHighlight: 'Component ecosystem JV operationalized for display modules and camera modules.' },
      { quarter: 'Q4 FY26', revenueCr: 12800, yoyRevenueGrowth: 92.5, qoqRevenueGrowth: 12.3, ebitdaMargin: 4.2, patCr: 285, yoyPatGrowth: 95.0, qoqPatGrowth: 12.2, concallHighlight: 'Secured export orders for global smartphone OEMs; IT Hardware PLI 2.0 approvals received.' },
      { quarter: 'Q1 FY27', revenueCr: 12800, yoyRevenueGrowth: 95.0, qoqRevenueGrowth: 0.0, ebitdaMargin: 4.1, patCr: 286, yoyPatGrowth: 104.2, qoqPatGrowth: 0.3, concallHighlight: 'Volume expansion remains phenomenal; working capital days maintained under 35 days.' }
    ],

    sectorMetrics: [
      { label: 'EBITDA Margin Profile', value: '4.1%', benchmark: '3.5% - 4.5%', assessment: 'Thin margins typical of contract manufacturing / EMS; compensated by high asset turns (RoCE > 40%).' },
      { label: 'Smartphone Assembly Run-Rate', value: '45M units/yr', benchmark: '> 30M units/yr', assessment: 'Emerging as the Foxconn of India for non-Apple android ecosystem.' },
      { label: 'PLI Incentive Accrual', value: '₹420 cr/yr', benchmark: 'On track', assessment: 'Timely disbursement verification critical; receivables backed by central government.' },
      { label: 'Component Localization %', value: '18.5%', benchmark: '> 15.0%', assessment: 'Key driver for margin expansion from 4% to 5.5% over next 3 years.' }
    ],

    redFlags: [
      { id: 'rf-1', title: 'Promoter Pledge', status: 'clean', details: 'Zero promoter shares pledged.', source: 'BSE Shareholding Pattern' },
      { id: 'rf-2', title: 'Valuation & Multiple Stretch', status: 'watch', details: 'Trading at 82.5x P/E; leaves zero room for execution stumble or client loss.', source: 'Market Analysis' },
      { id: 'rf-3', title: 'Customer Concentration', status: 'watch', details: 'Top 3 mobile customers account for >50% of incremental volume.', source: 'Investor Presentation' },
      { id: 'rf-4', title: 'Auditor Disclosures', status: 'clean', details: 'Clean report; no accounting qualifications.', source: 'FY26 Annual Report' }
    ],

    peers: [
      { name: 'Dixon Technologies', symbol: 'DIXON', marketCapCr: 74600, peTTM: 82.5, evEbitda: 46.2, roce5YrAvg: 34.2, patCagr3Yr: 68.5, promoterPledge: 0.0, debtToEquity: 0.08 },
      { name: 'Amber Enterprises', symbol: 'AMBER', marketCapCr: 21500, peTTM: 62.4, evEbitda: 28.5, roce5YrAvg: 14.2, patCagr3Yr: 24.1, promoterPledge: 0.0, debtToEquity: 0.52 },
      { name: 'Kaynes Technology', symbol: 'KAYNES', marketCapCr: 32400, peTTM: 94.2, evEbitda: 52.1, roce5YrAvg: 22.5, patCagr3Yr: 82.0, promoterPledge: 0.0, debtToEquity: 0.15 },
      { name: 'Syrma SGS', symbol: 'SYRMA', marketCapCr: 8900, peTTM: 48.1, evEbitda: 24.2, roce5YrAvg: 13.8, patCagr3Yr: 28.4, promoterPledge: 0.0, debtToEquity: 0.28 }
    ],

    bearScenario: {
      targetRange: '₹8,400 – ₹9,200',
      assumptions: 'Smartphone OEM client insourcing or loss of anchor customer; delay in PLI incentive disbursement stretching working capital; multiple de-rates from 80x to 45x P/E.',
      downsideRisk: '25% – 32% drawdown if growth slows from 60% to 25%.'
    },
    baseScenario: {
      targetRange: '₹13,200 – ₹14,500',
      assumptions: 'Revenue CAGR of 32% over FY26-FY29, component localization expanding EBITDA margins to 4.8%, RoCE sustaining above 38%. Valuation settles around 55-60x forward P/E.',
      thesisDrivers: 'Scale in mobile assembly + rapid ramp-up in laptops and IT hardware.'
    },
    bullScenario: {
      targetRange: '₹17,000 – ₹18,500',
      assumptions: 'Wins anchor export contracts for European markets, successfully enters EV electronic sub-assemblies; PAT crosses ₹2,500 cr by FY29. Multiple holds at 70x.',
      upsideTriggers: 'JV partnerships with tier-1 Taiwanese component makers and global export certifications.'
    },

    catalysts: [
      'Commercial ramp-up of display module JV with HKC',
      'Incentive cash realization from Central Government under Mobile PLI Scheme',
      'Addition of global anchor notebook PC brand under IT Hardware PLI 2.0',
      'Inclusion into Nifty 50 or MSCI India Standard Index in upcoming semi-annual review'
    ],
    risks: [
      'Extremely rich valuation multiple leaving no margin of safety for operational hiccups',
      'Thin operating margins (4%) vulnerable to component price surges or inventory write-downs',
      'Policy risk if GoI modifies PLI guidelines or import duties on finished electronics'
    ],
    bottomLineAssessment: 'Outstanding industrial execution and structural beneficiary of Indian electronic self-reliance; however, current elevated valuation multiple (82x TTM P/E) prices in years of flawless hyper-growth, recommending patience for a valuation cool-off.',
    whatWouldChangeMind: 'A sharp correction of 20%+ without deterioration in order pipeline, or substantial acceleration in component localization margins.',

    dcfDefaults: {
      currentPrice: 12450.00,
      riskFreeRate: 6.85,
      equityRiskPremium: 5.50,
      beta: 1.35,
      costOfDebt: 8.80,
      debtWeight: 5.0,
      equityWeight: 95.0,
      taxRate: 25.17,
      fiveYearRevGrowth: 28.0,
      operatingMargin: 4.6,
      terminalGrowthRate: 5.5
    },

    sources: [
      { title: 'Dixon Tech Financial Results Q1 FY27', period: 'Jul 2026', type: 'NSE / BSE Submission' },
      { title: 'Dixon Investor Presentation Q1 FY27', period: 'Jul 2026', type: 'Investor Presentation' },
      { title: 'Ministry of Electronics and Information Technology (MeitY) PLI Portal', period: 'May 2026', type: 'Government Data' },
      { title: 'BSE Shareholding Pattern Jun 2026', period: 'Jun 2026', type: 'Exchange Disclosure' }
    ]
  },
  {
    id: 'sunpharma',
    name: 'Sun Pharmaceutical Industries Limited',
    symbol: 'SUNPHARMA',
    bseCode: '524715',
    isin: 'INE044A01036',
    sector: 'Pharma / Healthcare',
    marketCapBucket: 'Large Cap',
    listingStatus: 'Mainboard',
    asOfDate: '14 Oct 2026',
    currentPrice: 1890.40,
    marketCapCr: 453500,
    freeFloatCr: 206300,
    high52w: 1960.00,
    low52w: 1110.00,
    peTTM: 38.6,
    pbRatio: 6.12,
    evEbitda: 25.4,
    dividendYield: 0.72,
    avgDailyTurnoverCr: 360.0,
    deliveryPercent: 55.4,
    circuitBand: 'Dynamic (F&O eligible)',
    asmGsmStatus: 'None (Clean)',
    dma50: 1845.20,
    dma200: 1650.10,

    promoterHolding: 54.48,
    promoterPledge: 0.00, // Fully de-pledged
    fiiHolding: 17.85,
    diiHolding: 19.42,
    publicHolding: 8.25,
    auditor: 'S R B C & CO LLP (Ernst & Young affiliate)',
    auditorTenureYears: 8,
    auditorQualifications: 'Unmodified / Clean Report',

    moatType: 'Global Specialty Pipeline, Domestic Formulation Leadership & Dermatology Moat',
    businessDescription: 'India’s #1 pharmaceutical company with 8.4% domestic market share and a booming global innovative specialty portfolio (Ilumya, Cequa, Winlevi, Odomzo, Deuruxolitinib) mitigating traditional US generic price erosion.',
    revenueMix: [
      { segment: 'India Formulations', percentage: 32 },
      { segment: 'US Formulations (Specialty + Generics)', percentage: 31 },
      { segment: 'Emerging Markets', percentage: 18 },
      { segment: 'Rest of World & API', percentage: 19 },
    ],
    moatDrivers: [
      'Global innovative specialty revenue exceeding $1.2B annually with patent protections into 2030s',
      'Dominant sales force in Indian chronic and sub-chronic therapies (cardio, neuro, derma)',
      'High cash generation (Net cash > ₹18,000 cr) enabling strategic tuck-in biotech acquisitions'
    ],

    financials: [
      { year: 'FY22', revenueCr: 39576, ebitdaCr: 10452, ebitdaMargin: 26.4, patCr: 3272, patMargin: 8.3, cfoCr: 8980, capexCr: 1540, fcfCr: 7440, roe: 6.8, roce: 15.2, debtToEquity: 0.08, debtorDays: 92, cashConversion: 274.5 },
      { year: 'FY23', revenueCr: 43885, ebitdaCr: 11646, ebitdaMargin: 26.5, patCr: 8473, patMargin: 19.3, cfoCr: 9850, capexCr: 1720, fcfCr: 8130, roe: 15.4, roce: 16.8, debtToEquity: 0.05, debtorDays: 89, cashConversion: 116.3 },
      { year: 'FY24', revenueCr: 48496, ebitdaCr: 13083, ebitdaMargin: 27.0, patCr: 9576, patMargin: 19.7, cfoCr: 11200, capexCr: 2100, fcfCr: 9100, roe: 15.8, roce: 18.2, debtToEquity: 0.03, debtorDays: 86, cashConversion: 117.0 },
      { year: 'FY25', revenueCr: 54200, ebitdaCr: 15176, ebitdaMargin: 28.0, patCr: 10840, patMargin: 20.0, cfoCr: 13100, capexCr: 2400, fcfCr: 10700, roe: 16.4, roce: 19.5, debtToEquity: 0.02, debtorDays: 84, cashConversion: 120.8 },
      { year: 'FY26', revenueCr: 60800, ebitdaCr: 17632, ebitdaMargin: 29.0, patCr: 12160, patMargin: 20.0, cfoCr: 15400, capexCr: 2700, fcfCr: 12700, roe: 17.1, roce: 20.4, debtToEquity: 0.01, debtorDays: 82, cashConversion: 126.6 },
      { year: 'TTM', revenueCr: 63500, ebitdaCr: 18540, ebitdaMargin: 29.2, patCr: 12750, patMargin: 20.1, cfoCr: 16100, capexCr: 2800, fcfCr: 13300, roe: 17.4, roce: 20.8, debtToEquity: 0.01, debtorDays: 81, cashConversion: 126.3 }
    ],

    quarterlies: [
      { quarter: 'Q2 FY26', revenueCr: 14800, yoyRevenueGrowth: 11.8, qoqRevenueGrowth: 3.5, ebitdaMargin: 28.8, patCr: 3040, yoyPatGrowth: 28.0, qoqPatGrowth: 7.2, concallHighlight: 'Global specialty sales reached $315M, up 19% YoY led by Ilumya and Cequa.' },
      { quarter: 'Q3 FY26', revenueCr: 15450, yoyRevenueGrowth: 12.5, qoqRevenueGrowth: 4.4, ebitdaMargin: 29.4, patCr: 3180, yoyPatGrowth: 26.2, qoqPatGrowth: 4.6, concallHighlight: 'Domestic formulation business outgrew IPM by 240 bps; Derma division launch strong.' },
      { quarter: 'Q4 FY26', revenueCr: 16100, yoyRevenueGrowth: 13.1, qoqRevenueGrowth: 4.2, ebitdaMargin: 29.8, patCr: 3340, yoyPatGrowth: 24.5, qoqPatGrowth: 5.0, concallHighlight: 'FDA review of Deuruxolitinib for alopecia areata progressing smoothly; R&D spend 6.8% of rev.' },
      { quarter: 'Q1 FY27', revenueCr: 16400, yoyRevenueGrowth: 14.7, qoqRevenueGrowth: 1.9, ebitdaMargin: 29.1, patCr: 3190, yoyPatGrowth: 12.5, qoqPatGrowth: -4.5, concallHighlight: 'Specialty contribution crosses 20% of consolidated turnover for the first time.' }
    ],

    sectorMetrics: [
      { label: 'Global Specialty Sales', value: '$1.28 Billion (TTM)', benchmark: '> $1.0B', assessment: 'Engine of margin expansion; insulates from generic price commoditization.' },
      { label: 'USFDA Plant Status', value: 'Halol (Warning Letter resolved/in remediation); Mohali VAI', benchmark: 'Clean VAI/NAI', assessment: 'Halol legacy issues mitigated as specialty production shifted to European/other CMOs.' },
      { label: 'Domestic IPM Market Share', value: '8.4%', benchmark: '#1 rank (> 7%)', assessment: 'Strong doctor prescription loyalty across cardiology, neurology, and gastroenterology.' },
      { label: 'R&D % of Revenue', value: '6.7%', benchmark: '6.0% - 8.0%', assessment: 'Focused high-value clinical trials rather than commoditized generic filing floods.' }
    ],

    redFlags: [
      { id: 'rf-1', title: 'Promoter Pledge', status: 'clean', details: 'Historical pledge completely cleared (0.00%).', source: 'BSE Shareholding Filing Jun 2026' },
      { id: 'rf-2', title: 'Auditor Continuity', status: 'clean', details: 'SRBC & Co LLP (EY network) continuing without qualifications.', source: 'Annual Report FY26' },
      { id: 'rf-3', title: 'Related Party Loans', status: 'clean', details: 'Historical Aditya Medisales distribution controversy completely restructured to direct subsidiary in 2019; clean since.', source: 'SEBI Clearance & Corporate Disclosures' },
      { id: 'rf-4', title: 'Patent Litigation Overhang', status: 'watch', details: 'Ongoing patent infringement counters by Incyte on Deuruxolitinib (JAK inhibitor); monitored closely.', source: 'US District Court Filings' }
    ],

    peers: [
      { name: 'Sun Pharma', symbol: 'SUNPHARMA', marketCapCr: 453500, peTTM: 38.6, evEbitda: 25.4, roce5YrAvg: 18.2, patCagr3Yr: 24.8, promoterPledge: 0.0, debtToEquity: 0.01 },
      { name: 'Cipla', symbol: 'CIPLA', marketCapCr: 128500, peTTM: 26.4, evEbitda: 17.8, roce5YrAvg: 19.5, patCagr3Yr: 21.4, promoterPledge: 0.0, debtToEquity: 0.02 },
      { name: 'Dr. Reddy’s Labs', symbol: 'DRREDDY', marketCapCr: 112000, peTTM: 19.2, evEbitda: 13.4, roce5YrAvg: 22.1, patCagr3Yr: 18.5, promoterPledge: 0.0, debtToEquity: 0.05 },
      { name: 'Torrent Pharma', symbol: 'TORNTPHARM', marketCapCr: 118400, peTTM: 58.2, evEbitda: 28.1, roce5YrAvg: 20.4, patCagr3Yr: 22.8, promoterPledge: 0.0, debtToEquity: 0.65 }
    ],

    bearScenario: {
      targetRange: '₹1,550 – ₹1,650',
      assumptions: 'Adverse patent ruling on Deuruxolitinib delaying commercial rollout; renewed US generic erosion exceeding 10%; USFDA escalates inspection notices at additional Indian plants.',
      downsideRisk: '12% – 18% correction.'
    },
    baseScenario: {
      targetRange: '₹2,050 – ₹2,200',
      assumptions: 'Specialty revenues compound at 16% CAGR; domestic formulation sustains 10-11% growth; EBITDA margin holds >29%. P/E multiple sustains at 35x.',
      thesisDrivers: 'Ilumya label expansion to psoriatic arthritis, launch of new dermatology indications, and massive net cash hoard.'
    },
    bullScenario: {
      targetRange: '₹2,450 – ₹2,600',
      assumptions: 'Uncontested commercial launch of Deuruxolitinib with peak sales potential >$750M; accretive specialty M&A; EBITDA margins touch 31%. Multiple re-rates to 40x forward.',
      upsideTriggers: 'Blockbuster specialty clinical trial readouts and resolution of all pending FDA observation notices.'
    },

    catalysts: [
      'USFDA final approval and commercial pricing launch of Deuruxolitinib for severe alopecia',
      'Ilumya clinical trial Phase-3 data in additional autoimmune indications',
      'Strategic cash deployment from ₹18,000+ cr treasury in specialty oncology/immunology assets',
      'Sustained double-digit expansion of domestic IPM division'
    ],
    risks: [
      'US patent challenge verdicts on key specialty drugs',
      'USFDA regulatory inspections turning from VAI to OAI (Official Action Indicated)',
      'Currency headwind if INR appreciates against USD and emerging market currencies'
    ],
    bottomLineAssessment: 'Quality franchise commanding sector leadership with structural specialty moat; while valuation has expanded to 38x TTM P/E, strong earnings visibility and pristine balance sheet support long-term compounding.',
    whatWouldChangeMind: 'Adverse US court injunction against Deuruxolitinib launch or specialty portfolio revenue growth decelerating into single digits.',

    dcfDefaults: {
      currentPrice: 1890.40,
      riskFreeRate: 6.85,
      equityRiskPremium: 5.50,
      beta: 0.65, // Low beta defensive healthcare
      costOfDebt: 8.00,
      debtWeight: 2.0,
      equityWeight: 98.0,
      taxRate: 25.17,
      fiveYearRevGrowth: 12.0,
      operatingMargin: 29.5,
      terminalGrowthRate: 5.0
    },

    sources: [
      { title: 'Sun Pharma Q1 FY27 Results Release', period: 'Aug 2026', type: 'NSE / BSE Filing' },
      { title: 'Sun Pharma Annual Report FY26', period: 'Jun 2026', type: 'Statutory Filing' },
      { title: 'USFDA Inspection Tracker (Mohali / Halol)', period: 'May 2026', type: 'Regulatory Database' },
      { title: 'IQVIA Indian Pharmaceutical Market (IPM) Monthly Audit', period: 'Jun 2026', type: 'Industry Report' }
    ]
  }
];
