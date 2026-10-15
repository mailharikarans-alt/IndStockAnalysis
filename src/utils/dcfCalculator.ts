import { DCFModelInputs } from '../types/equity';

export interface DCFResult {
  costOfEquity: number;
  wacc: number;
  projectedFCFs: { year: number; label: string; fcfCr: number; pvCr: number }[];
  pvExplicitCr: number;
  terminalValueCr: number;
  pvTerminalValueCr: number;
  enterpriseValueCr: number;
  impliedEquityValueCr: number;
  impliedSharePrice: number;
  upsideDownsidePercent: number;
  marginOfSafetyStatus: 'Wide' | 'Fair' | 'Overvalued' | 'Extreme Risk';
  sensitivityTable: {
    wacc: number;
    values: { terminalGrowth: number; sharePrice: number }[];
  }[];
}

export function calculateDCF(inputs: DCFModelInputs, sharesOutstandingCr: number, netDebtCr: number): DCFResult {
  const {
    currentPrice,
    riskFreeRate,
    equityRiskPremium,
    beta,
    costOfDebt,
    debtWeight,
    equityWeight,
    taxRate,
    fiveYearRevGrowth,
    operatingMargin,
    terminalGrowthRate,
  } = inputs;

  // Cost of equity via CAPM: Ke = Rf + Beta * ERP
  const costOfEquity = riskFreeRate + beta * equityRiskPremium;

  // After-tax cost of debt: Kd * (1 - t)
  const afterTaxCostOfDebt = costOfDebt * (1 - taxRate / 100);

  // WACC
  const totalWeight = debtWeight + equityWeight;
  const wacc =
    totalWeight > 0
      ? (equityWeight / totalWeight) * costOfEquity + (debtWeight / totalWeight) * afterTaxCostOfDebt
      : costOfEquity;

  const waccDecimal = Math.max(wacc / 100, 0.06);
  const termGrowthDecimal = Math.min(terminalGrowthRate / 100, waccDecimal - 0.015);

  // Base year revenue approximation from market cap and typical ratios
  const baseRevenueCr = (currentPrice * sharesOutstandingCr) / 2.5;

  const projectedFCFs: { year: number; label: string; fcfCr: number; pvCr: number }[] = [];
  let pvExplicitCr = 0;
  let runningRev = baseRevenueCr;

  for (let yr = 1; yr <= 5; yr++) {
    runningRev = runningRev * (1 + fiveYearRevGrowth / 100);
    const operatingProfit = runningRev * (operatingMargin / 100);
    const nopat = operatingProfit * (1 - taxRate / 100);
    // Approximate reinvestment rate at 35% of NOPAT for growth in India
    const fcf = nopat * 0.65;
    const discountFactor = Math.pow(1 + waccDecimal, yr);
    const pv = fcf / discountFactor;

    pvExplicitCr += pv;
    projectedFCFs.push({
      year: yr,
      label: `FY${26 + yr}`,
      fcfCr: Math.round(fcf),
      pvCr: Math.round(pv),
    });
  }

  const finalYearFCF = projectedFCFs[projectedFCFs.length - 1].fcfCr;
  // Terminal Value = FCF5 * (1 + g) / (WACC - g)
  const terminalValueCr = (finalYearFCF * (1 + termGrowthDecimal)) / (waccDecimal - termGrowthDecimal);
  const pvTerminalValueCr = terminalValueCr / Math.pow(1 + waccDecimal, 5);

  const enterpriseValueCr = pvExplicitCr + pvTerminalValueCr;
  const impliedEquityValueCr = Math.max(enterpriseValueCr - netDebtCr, 100);
  const impliedSharePrice = Math.round((impliedEquityValueCr / sharesOutstandingCr) * 10) / 10;

  const upsideDownsidePercent =
    Math.round(((impliedSharePrice - currentPrice) / currentPrice) * 1000) / 10;

  let marginOfSafetyStatus: 'Wide' | 'Fair' | 'Overvalued' | 'Extreme Risk' = 'Fair';
  if (upsideDownsidePercent > 25) marginOfSafetyStatus = 'Wide';
  else if (upsideDownsidePercent >= -5 && upsideDownsidePercent <= 25) marginOfSafetyStatus = 'Fair';
  else if (upsideDownsidePercent < -25) marginOfSafetyStatus = 'Extreme Risk';
  else marginOfSafetyStatus = 'Overvalued';

  // 3x3 Sensitivity Table: WACC (-1%, 0%, +1%) x Terminal Growth (-0.5%, 0%, +0.5%)
  const waccVariations = [wacc - 1.0, wacc, wacc + 1.0];
  const gVariations = [terminalGrowthRate - 0.5, terminalGrowthRate, terminalGrowthRate + 0.5];

  const sensitivityTable = waccVariations.map((wVal) => {
    const wDec = Math.max(wVal / 100, 0.05);
    const values = gVariations.map((gVal) => {
      const gDec = Math.min(gVal / 100, wDec - 0.015);
      let sPvExplicit = 0;
      projectedFCFs.forEach((item) => {
        sPvExplicit += item.fcfCr / Math.pow(1 + wDec, item.year);
      });
      const sTermVal = (finalYearFCF * (1 + gDec)) / (wDec - gDec);
      const sPvTerm = sTermVal / Math.pow(1 + wDec, 5);
      const sEV = sPvExplicit + sPvTerm;
      const sEqVal = Math.max(sEV - netDebtCr, 100);
      const sPrice = Math.round((sEqVal / sharesOutstandingCr) * 10) / 10;
      return {
        terminalGrowth: gVal,
        sharePrice: sPrice,
      };
    });
    return {
      wacc: Math.round(wVal * 10) / 10,
      values,
    };
  });

  return {
    costOfEquity: Math.round(costOfEquity * 100) / 100,
    wacc: Math.round(wacc * 100) / 100,
    projectedFCFs,
    pvExplicitCr: Math.round(pvExplicitCr),
    terminalValueCr: Math.round(terminalValueCr),
    pvTerminalValueCr: Math.round(pvTerminalValueCr),
    enterpriseValueCr: Math.round(enterpriseValueCr),
    impliedEquityValueCr: Math.round(impliedEquityValueCr),
    impliedSharePrice,
    upsideDownsidePercent,
    marginOfSafetyStatus,
    sensitivityTable,
  };
}
