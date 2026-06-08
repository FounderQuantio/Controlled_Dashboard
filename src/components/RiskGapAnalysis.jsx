import Plot from './PlotChart';
import { riskDomainScorecard, subpartSummary } from '../data/icmData';
import { C, plotBase, RISK_COLORSCALE } from '../data/chartColors';

function priorityClass(p) {
  if (p.includes('COMPLIANT'))  return 'priority-compliant';
  if (p.includes('PHASE 2'))    return 'priority-phase2';
  if (p.includes('EVIDENCE'))   return 'priority-evidgap';
  if (p.includes('PROGRESS'))   return 'priority-inprogress';
  if (p.includes('PARTIAL'))    return 'priority-partial';
  return '';
}

const cfg = { displayModeBar: false, responsive: true };

export default function RiskGapAnalysis() {
  // Scatter: impl% vs evidence% (bubble = total)
  const scatter = {
    x: riskDomainScorecard.map((d) => d.implPct * 100),
    y: riskDomainScorecard.map((d) => d.evidPct * 100),
    mode: 'markers+text',
    type: 'scatter',
    text: riskDomainScorecard.map((d) => d.domain.split(' ')[0]),
    textposition: 'top center',
    textfont: { color: '#94a3b8', size: 9 },
    marker: {
      size: riskDomainScorecard.map((d) => Math.max(d.total * 1.5, 14)),
      color: riskDomainScorecard.map((d) => d.highRisk),
      colorscale: RISK_COLORSCALE,
      showscale: true,
      colorbar: { title: { text: 'High Risk', font: { color: '#94a3b8', size: 10 } }, tickfont: { color: '#94a3b8', size: 10 }, bgcolor: 'transparent', outlinecolor: '#334155' },
      line: { color: '#334155', width: 1 },
    },
    hovertemplate: '<b>%{text}</b><br>Impl: %{x:.0f}%<br>Evidence: %{y:.0f}%<extra></extra>',
  };

  // Subpart grouped bar
  const subBars = [
    { x: subpartSummary.map((s) => s.implemented), y: subpartSummary.map((s) => s.subpart), type: 'bar', orientation: 'h', name: 'Implemented', marker: { color: C.teal } },
    { x: subpartSummary.map((s) => s.inProgress),  y: subpartSummary.map((s) => s.subpart), type: 'bar', orientation: 'h', name: 'In Progress',  marker: { color: C.amber } },
    { x: subpartSummary.map((s) => s.phase2),       y: subpartSummary.map((s) => s.subpart), type: 'bar', orientation: 'h', name: 'Phase 2',       marker: { color: C.slate } },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h2>Risk &amp; Gap Analysis</h2>
        <p>Priority matrix with recalibrated risk ratings · High (financial, subrecipient, audit) · Medium (governance, closeout) · Low (records)</p>
      </div>

      <div className="charts-row" style={{ marginBottom: 24 }}>
        <div className="chart-card">
          <h3>Implementation vs Evidence Coverage (bubble = total controls, colour = high risk count)</h3>
          <Plot
            data={[scatter]}
            layout={{
              ...plotBase, height: 320,
              xaxis: { title: { text: 'Implementation %', font: { color: '#94a3b8' } }, gridcolor: '#334155', color: '#94a3b8', range: [-5, 105] },
              yaxis: { title: { text: 'Evidence Coverage %', font: { color: '#94a3b8' } }, gridcolor: '#334155', color: '#94a3b8', range: [-5, 110] },
              margin: { t: 10, b: 50, l: 50, r: 10 },
              showlegend: false,
            }}
            config={cfg} style={{ width: '100%' }}
          />
        </div>
        <div className="chart-card">
          <h3>CFR Subpart Status Breakdown</h3>
          <Plot
            data={subBars}
            layout={{
              ...plotBase, height: 320, barmode: 'stack',
              xaxis: { gridcolor: '#334155', color: '#94a3b8' },
              yaxis: { color: '#94a3b8', automargin: true },
              margin: { t: 10, b: 30, l: 100, r: 10 },
              legend: { orientation: 'h', y: -0.15, font: { color: '#94a3b8', size: 11 }, bgcolor: 'transparent' },
            }}
            config={cfg} style={{ width: '100%' }}
          />
        </div>
      </div>

      <div className="table-wrap">
        <div className="table-toolbar">
          <span style={{ fontWeight: 600, fontSize: 13 }}>Domain Risk Scorecard</span>
          <span className="table-count">{riskDomainScorecard.length} domains</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Process Domain</th>
                <th>Total</th>
                <th>Implemented</th>
                <th>In Progress</th>
                <th>Phase 2</th>
                <th>High Risk</th>
                <th>Evidence Gap</th>
                <th>Impl %</th>
                <th>Evidence %</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {riskDomainScorecard.map((d) => (
                <tr key={d.domain}>
                  <td style={{ fontWeight: 500 }}>{d.domain}</td>
                  <td>{d.total}</td>
                  <td>{d.implemented}</td>
                  <td>{d.inProgress}</td>
                  <td>{d.phase2}</td>
                  <td style={{ color: d.highRisk > 0 ? 'var(--red)' : 'var(--muted)' }}>{d.highRisk}</td>
                  <td style={{ color: d.evidGap > 0 ? 'var(--yellow)' : 'var(--muted)' }}>{d.evidGap}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="prog-bar-wrap" style={{ width: 60 }}>
                        <div className="prog-bar" style={{ width: `${d.implPct * 100}%`, background: d.implPct === 1 ? C.teal : d.implPct > 0.5 ? C.amber : C.red }} />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{Math.round(d.implPct * 100)}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="prog-bar-wrap" style={{ width: 60 }}>
                        <div className="prog-bar" style={{ width: `${d.evidPct * 100}%`, background: 'var(--accent)' }} />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{Math.round(d.evidPct * 100)}%</span>
                    </div>
                  </td>
                  <td className={priorityClass(d.priority)} style={{ whiteSpace: 'nowrap', fontSize: 12 }}>{d.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
