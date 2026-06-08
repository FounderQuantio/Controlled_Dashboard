import { useState } from 'react';
import Plot from './PlotChart';
import { impactInputs, marketGap } from '../data/icmData';
import { C, plotBase } from '../data/chartColors';

const cfg = { displayModeBar: false, responsive: true };

export default function NationalImpactCalc() {
  const [adoptionRate, setAdoptionRate] = useState(impactInputs.adoptionRate * 100);
  const [costReduction, setCostReduction] = useState(impactInputs.costReductionPct * 100);

  const { totalEntities, annualQuestionedCostsB, commercialPlatformCostK } = impactInputs;

  const adoptingEntities = Math.round(totalEntities * (adoptionRate / 100));
  const avgQuestionedCostPerEntity = (annualQuestionedCostsB * 1e9) / totalEntities;
  const protectedFundsM = ((adoptingEntities * avgQuestionedCostPerEntity * (costReduction / 100)) / 1e6).toFixed(1);
  const platformCostAvoidedM = ((adoptingEntities * commercialPlatformCostK * 1000) / 1e6).toFixed(1);
  const totalBenefitM = (parseFloat(protectedFundsM) + parseFloat(platformCostAvoidedM)).toFixed(1);

  // Waterfall chart
  const waterfall = {
    type: 'waterfall',
    orientation: 'v',
    measure: ['relative', 'relative', 'total'],
    x: ['Protected Federal Funds', 'Platform Cost Avoided', 'Total Annual Benefit'],
    y: [parseFloat(protectedFundsM), parseFloat(platformCostAvoidedM), 0],
    text: [`$${protectedFundsM}M`, `$${platformCostAvoidedM}M`, `$${totalBenefitM}M`],
    textposition: 'outside',
    textfont: { color: '#e2e8f0', size: 12 },
    connector: { line: { color: '#334155' } },
    increasing:  { marker: { color: C.teal } },
    totals:      { marker: { color: C.blue } },
    hovertemplate: '<b>%{x}</b><br>$%{y:.1f}M<extra></extra>',
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>National Impact Calculator</h2>
        <p>Prong 1 Evidence — Formula-driven projection of dollar-value national impact · Adjust sliders to model scenarios</p>
      </div>

      <div className="calc-grid" style={{ marginBottom: 24 }}>
        <div className="calc-inputs">
          <h3>Input Assumptions</h3>

          <div className="input-row">
            <div className="input-label">Single Audit-subject entities (U.S.)</div>
            <div className="range-val">{totalEntities.toLocaleString()}</div>
            <div className="input-source">{impactInputs.sources.entities}</div>
          </div>

          <div className="input-row">
            <div className="input-label">Annual questioned costs — all entities</div>
            <div className="range-val">${annualQuestionedCostsB}B</div>
            <div className="input-source">{impactInputs.sources.questionedCosts}</div>
          </div>

          <div className="input-row">
            <div className="input-label">ICM adoption rate: <span className="range-val">{adoptionRate.toFixed(1)}%</span></div>
            <input type="range" className="range-input" min="1" max="25" step="0.5" value={adoptionRate} onChange={(e) => setAdoptionRate(parseFloat(e.target.value))} />
            <div className="input-source">Adjustable — default conservative 5%</div>
          </div>

          <div className="input-row">
            <div className="input-label">Cost reduction per adopter: <span className="range-val">{costReduction.toFixed(0)}%</span></div>
            <input type="range" className="range-input" min="5" max="30" step="1" value={costReduction} onChange={(e) => setCostReduction(parseFloat(e.target.value))} />
            <div className="input-source">Adjustable — default 10%</div>
          </div>

          <div className="input-row">
            <div className="input-label">Commercial platform annual cost</div>
            <div className="range-val">${commercialPlatformCostK}K / entity</div>
            <div className="input-source">{impactInputs.sources.commercialCost}</div>
          </div>
        </div>

        <div className="calc-outputs">
          <h3>Projected National Impact</h3>
          <div className="output-row">
            <div>
              <div className="output-label">Entities adopting ICM</div>
              <div className="output-prong">Prong 1</div>
            </div>
            <div className="output-val">{adoptingEntities.toLocaleString()}</div>
          </div>
          <div className="output-row">
            <div>
              <div className="output-label">Protected federal funds</div>
              <div className="output-prong">Prong 1</div>
            </div>
            <div className="output-val">${protectedFundsM}M</div>
          </div>
          <div className="output-row">
            <div>
              <div className="output-label">Commercial platform cost avoided</div>
              <div className="output-prong">Prong 3</div>
            </div>
            <div className="output-val">${platformCostAvoidedM}M</div>
          </div>
          <div className="output-row" style={{ borderTop: '2px solid var(--accent)', marginTop: 8, paddingTop: 16 }}>
            <div>
              <div className="output-label" style={{ fontWeight: 700, color: 'var(--text)' }}>Total Annual National Benefit</div>
              <div className="output-prong">Prong 1 + 3</div>
            </div>
            <div className="output-val" style={{ fontSize: 26, color: 'var(--accent)' }}>${totalBenefitM}M</div>
          </div>
        </div>
      </div>

      <div className="chart-card" style={{ marginBottom: 24 }}>
        <h3>National Benefit Waterfall</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Plot
            data={[{ ...waterfall, width: [0.35, 0.35, 0.35] }]}
            layout={{
              ...plotBase, font: { ...plotBase.font, size: 12 }, height: 280, width: 680,
              xaxis: { color: '#94a3b8', gridcolor: '#334155' },
              yaxis: { color: '#94a3b8', gridcolor: '#334155', tickprefix: '$', ticksuffix: 'M' },
              margin: { t: 30, b: 50, l: 70, r: 20 },
              showlegend: false,
            }}
            config={cfg}
          />
        </div>
      </div>

      <div className="table-wrap">
        <div className="table-toolbar">
          <span style={{ fontWeight: 600, fontSize: 13 }}>Market Gap Analysis</span>
          <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 8 }}>ICM vs. commercial platforms</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th style={{ minWidth: 200 }}>Factor</th>
                <th>eCivis</th>
                <th>Blackbaud Grants</th>
                <th>SAP Grants Mgmt</th>
                <th style={{ color: 'var(--green)' }}>Petitioner's ICM</th>
              </tr>
            </thead>
            <tbody>
              {marketGap.map((row) => (
                <tr key={row.factor}>
                  <td style={{ fontWeight: 500 }}>{row.factor}</td>
                  <td style={{ color: 'var(--muted)' }}>{row.ecivis}</td>
                  <td style={{ color: 'var(--muted)' }}>{row.blackbaud}</td>
                  <td style={{ color: 'var(--muted)' }}>{row.sap}</td>
                  <td className="icm-col">{row.icm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
