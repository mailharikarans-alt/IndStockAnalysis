import { StockProfile } from '../types/equity';
import { calculateDCF } from './dcfCalculator';

export function generateAgentsMarkdownReport(stock: StockProfile): string {
  const sharesOutstandingCr = stock.marketCapCr / stock.currentPrice;
  const netDebtCr = stock.financials[stock.financials.length - 1].debtToEquity * (stock.marketCapCr / stock.pbRatio) * 0.4;
  const dcf = calculateDCF(stock.dcfDefaults, sharesOutstandingCr, netDebtCr);

  return `# ${stock.name} (NSE: ${stock.symbol} | BSE: ${stock.bseCode}) — Analysis as of ${stock.asOfDate}

## 1. Snapshot
- **Current Market Price:** ₹${stock.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
- **Market Capitalization:** ₹${stock.marketCapCr.toLocaleString('en-IN')} cr
- **Market Cap Bucket:** ${stock.marketCapBucket} | **Listing Status:** ${stock.listingStatus}
- **Sector / Industry Lens:** ${stock.sector}
- **52-Week Range:** ₹${stock.low52w} – ₹${stock.high52w}
- **Free Float:** ₹${stock.freeFloatCr.toLocaleString('en-IN')} cr
- **Average Daily Traded Value:** ₹${stock.avgDailyTurnoverCr} cr
- **Delivery %:** ${stock.deliveryPercent}% (as of ${stock.asOfDate})
- **Valuation Multiples:** P/E (TTM): ${stock.peTTM}x | P/B: ${stock.pbRatio}x | EV/EBITDA: ${stock.evEbitda}x | Div Yield: ${stock.dividendYield}%

---

## 2. Business & Moat
- **Business Description:** ${stock.businessDescription}
- **Moat Classification:** ${stock.moatType}
- **Revenue Segmentation:**
${stock.revenueMix.map(m => `  - ${m.segment}: ${m.percentage}%`).join('\n')}
- **Key Moat Drivers:**
${stock.moatDrivers.map(d => `  - ${d}`).join('\n')}

---

## 3. Financial Summary
*All figures in ₹ crore unless stated otherwise. Consolidated accounts.*

### Multi-Year Trend (FY22 – TTM)
| Period | Revenue (₹ cr) | EBITDA (₹ cr) | EBITDA Margin (%) | PAT (₹ cr) | PAT Margin (%) | CFO (₹ cr) | Capex (₹ cr) | FCF (₹ cr) | RoE (%) | RoCE (%) | D/E | CFO/PAT (%) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
${stock.financials.map(f => `| ${f.year} | ₹${f.revenueCr.toLocaleString('en-IN')} | ₹${f.ebitdaCr.toLocaleString('en-IN')} | ${f.ebitdaMargin}% | ₹${f.patCr.toLocaleString('en-IN')} | ${f.patMargin}% | ₹${f.cfoCr.toLocaleString('en-IN')} | ₹${f.capexCr.toLocaleString('en-IN')} | ₹${f.fcfCr.toLocaleString('en-IN')} | ${f.roe}% | ${f.roce}% | ${f.debtToEquity} | ${f.cashConversion}% |`).join('\n')}

### Recent Quarterly Results
| Quarter | Revenue (₹ cr) | YoY (%) | QoQ (%) | EBITDA Margin (%) | PAT (₹ cr) | YoY PAT (%) | Concall Highlight |
|---|---|---|---|---|---|---|---|
${stock.quarterlies.map(q => `| ${q.quarter} | ₹${q.revenueCr.toLocaleString('en-IN')} | ${q.yoyRevenueGrowth > 0 ? '+' : ''}${q.yoyRevenueGrowth}% | ${q.qoqRevenueGrowth > 0 ? '+' : ''}${q.qoqRevenueGrowth}% | ${q.ebitdaMargin}% | ₹${q.patCr.toLocaleString('en-IN')} | ${q.yoyPatGrowth > 0 ? '+' : ''}${q.yoyPatGrowth}% | ${q.concallHighlight} |`).join('\n')}

---

## 4. Quality & Governance Check
- **Promoter Holding:** ${stock.promoterHolding}%
- **Promoter Pledge:** ${stock.promoterPledge}% (Creation/Invocation: Nil)
- **Institutional Holdings:** FII: ${stock.fiiHolding}% | DII / Mutual Funds: ${stock.diiHolding}% | Public: ${stock.publicHolding}%
- **Statutory Auditor:** ${stock.auditor} (Tenure: ${stock.auditorTenureYears} yrs)
- **Auditor Report Opinion:** ${stock.auditorQualifications}
- **Red Flag Scan (Section 6 Compliance):**
${stock.redFlags.map(rf => `  - [${rf.status.toUpperCase()}] **${rf.title}**: ${rf.details} *(Source: ${rf.source})*`).join('\n')}

---

## 5. Valuation
### A. Relative Valuation (vs Listed Peers)
| Peer Entity | Ticker | Market Cap (₹ cr) | P/E (TTM) | EV/EBITDA | 5-Yr Avg RoCE (%) | 3-Yr PAT CAGR (%) | Promoter Pledge (%) | D/E |
|---|---|---|---|---|---|---|---|---|
${stock.peers.map(p => `| ${p.name} | ${p.symbol} | ₹${p.marketCapCr.toLocaleString('en-IN')} | ${p.peTTM}x | ${p.evEbitda}x | ${p.roce5YrAvg}% | ${p.patCagr3Yr}% | ${p.promoterPledge}% | ${p.debtToEquity} |`).join('\n')}

### B. Intrinsic Valuation — Discounted Cash Flow (DCF)
- **Cost of Equity (CAPM):** ${dcf.costOfEquity}% *(Risk-Free 10-Yr G-Sec: ${stock.dcfDefaults.riskFreeRate}%, Beta: ${stock.dcfDefaults.beta}, ERP: ${stock.dcfDefaults.equityRiskPremium}%)*
- **WACC:** ${dcf.wacc}%
- **5-Year Revenue CAGR Assumption:** ${stock.dcfDefaults.fiveYearRevGrowth}%
- **Operating Margin Assumption:** ${stock.dcfDefaults.operatingMargin}%
- **Terminal Growth Rate:** ${stock.dcfDefaults.terminalGrowthRate}%
- **Present Value of Explicit Cash Flows (FY27–FY31):** ₹${dcf.pvExplicitCr.toLocaleString('en-IN')} cr
- **Terminal Value (PV):** ₹${dcf.pvTerminalValueCr.toLocaleString('en-IN')} cr
- **Enterprise Value:** ₹${dcf.enterpriseValueCr.toLocaleString('en-IN')} cr
- **Implied Equity Value Per Share:** ₹${dcf.impliedSharePrice}
- **Current Market Price:** ₹${stock.currentPrice}
- **Implied Margin of Safety:** ${dcf.upsideDownsidePercent > 0 ? '+' : ''}${dcf.upsideDownsidePercent}% (${dcf.marginOfSafetyStatus})

---

## 6. Technical & Liquidity Context
- **Trend & Moving Averages:** 50 DMA: ₹${stock.dma50} | 200 DMA: ₹${stock.dma200}
- **Circuit Band:** ${stock.circuitBand}
- **Exchange Surveillance:** ${stock.asmGsmStatus}
- **Exit Liquidity Assessment:** Average daily turnover of ₹${stock.avgDailyTurnoverCr} cr provides ample institutional liquidity; minimal slippage for retail positions.

---

## 7. Catalysts
${stock.catalysts.map(c => `- ${c}`).join('\n')}

---

## 8. Risks
${stock.risks.map(r => `- ${r}`).join('\n')}

---

## 9. Bull / Base / Bear Scenarios

| Scenario | Target Range | Key Assumptions | Risk / Reward Driver |
|---|---|---|---|
| **Bear Case** | ${stock.bearScenario.targetRange} | ${stock.bearScenario.assumptions} | ${stock.bearScenario.downsideRisk} |
| **Base Case** | ${stock.baseScenario.targetRange} | ${stock.baseScenario.assumptions} | ${stock.baseScenario.thesisDrivers} |
| **Bull Case** | ${stock.bullScenario.targetRange} | ${stock.bullScenario.assumptions} | ${stock.bullScenario.upsideTriggers} |

---

## 10. Bottom Line
**[ASSESSMENT]**: ${stock.bottomLineAssessment}

**What Would Invalidate This View:**
${stock.whatWouldChangeMind}

---

## Sources & Data Dates
${stock.sources.map(s => `- **${s.title}** (${s.period}) — *${s.type}*`).join('\n')}
- Price and market data as of: **${stock.asOfDate}**

---

## Disclaimer
> This analysis is for educational and informational purposes only. It is not investment advice or a SEBI-registered research recommendation. Verify data from primary sources and consult a SEBI-registered advisor before investing.
`;
}
