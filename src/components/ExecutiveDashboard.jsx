import Plot from './PlotChart';
import { kpis, domainSummary, subpartSummary } from '../data/icmData';
import { C, plotBase } from '../data/chartColors';

const cfg = { displayModeBar: false, responsive: true };

const barLayout = {
  ...plotBase, barmode: 'stack',
  xaxis: { gridcolor: '#334155', color: '#94a3b8', tickfont: { size: 10 } },
  yaxis: { color: '#94a3b8', tickfont: { size: 10 }, automargin: true },
  legend: { orientation: 'h', y: -0.14, font: { color: '#94a3b8', size: 11 }, bgcolor: 'transparent' },
};

const mkBar = (getData, name, color) => ({
  x: getData, y: domainSummary.map((d) => d.domain),
  type: 'bar', orientation: 'h', name,
  marker: { color },
  hovertemplate: `<b>%{y}</b><br>${name}: %{x}<extra></extra>`,
});

const mkSubBar = (getData, name, color, data) => ({
  x: data.map(getData), y: data.map((s) => s.subpart),
  type: 'bar', orientation: 'h', name,
  marker: { color },
  hovertemplate: `<b>%{y}</b><br>${name}: %{x}<extra></extra>`,
});

export default function ExecutiveDashboard() {
  const pct = (n) => `${Math.round((n / kpis.totalControls) * 100)}%`;

  const donut = {
    values: [kpis.implemented, kpis.inProgress, kpis.phase2],
    labels: ['Implemented', 'In Progress', 'Phase 2 / Config'],
    type: 'pie', hole: 0.55,
    marker: { colors: [C.teal, C.amber, C.slate] },
    textinfo: 'label+percent',
    textfont: { color: '#e2e8f0', size: 11 },
    hovertemplate: '<b>%{label}</b><br>%{value} controls<br>%{percent}<extra></extra>',
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Executive Dashboard</h2>
        <p>Federal Grant Compliance — Internal Control Matrix · {kpis.standards} · Reporting Date: {kpis.reportingDate}</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card blue"><div className="label">Total Controls</div><div className="value">{kpis.totalControls}</div><div className="sub">All 7 CFR Subparts</div></div>
        <div className="kpi-card green"><div className="label">Implemented ✓</div><div className="value">{kpis.implemented}</div><div className="sub">{pct(kpis.implemented)} of total</div></div>
        <div className="kpi-card yellow"><div className="label">In Progress ◑</div><div className="value">{kpis.inProgress}</div><div className="sub">{pct(kpis.inProgress)} of total</div></div>
        <div className="kpi-card slate"><div className="label">Phase 2 / Config ○</div><div className="value">{kpis.phase2}</div><div className="sub">{pct(kpis.phase2)} of total</div></div>
        <div className="kpi-card blue"><div className="label">Evidence Ready</div><div className="value">{kpis.evidenceReady}</div><div className="sub">{pct(kpis.evidenceReady)} of total</div></div>
        <div className="kpi-card red"><div className="label">High Risk</div><div className="value">{kpis.highRisk}</div><div className="sub">{pct(kpis.highRisk)} of total</div></div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>Implementation Status Distribution</h3>
          <Plot
            data={[donut]}
            layout={{ ...plotBase, height: 280, margin: { t: 10, b: 10, l: 10, r: 10 }, showlegend: true, legend: { font: { color: '#94a3b8', size: 11 }, bgcolor: 'transparent' } }}
            config={cfg} style={{ width: '100%' }}
          />
        </div>
        <div className="chart-card">
          <h3>CFR Subpart Compliance</h3>
          <Plot
            data={[
              mkSubBar((s) => s.implemented, 'Implemented', C.teal,  subpartSummary),
              mkSubBar((s) => s.inProgress,  'In Progress',  C.amber, subpartSummary),
              mkSubBar((s) => s.phase2,      'Phase 2',      C.slate, subpartSummary),
            ]}
            layout={{ ...barLayout, height: 280, margin: { t: 10, b: 40, l: 100, r: 20 } }}
            config={cfg} style={{ width: '100%' }}
          />
        </div>
      </div>

      <div className="chart-card" style={{ marginBottom: 24 }}>
        <h3>Implementation by Process Domain</h3>
        <Plot
          data={[
            mkBar(domainSummary.map((d) => d.implemented), 'Implemented', C.teal),
            mkBar(domainSummary.map((d) => d.inProgress),  'In Progress',  C.amber),
            mkBar(domainSummary.map((d) => d.phase2),      'Phase 2',      C.slate),
          ]}
          layout={{ ...barLayout, height: 380, margin: { t: 10, b: 30, l: 160, r: 20 } }}
          config={cfg} style={{ width: '100%' }}
        />
      </div>

      <div className="table-wrap">
        <div className="table-toolbar" style={{ padding: '14px 16px' }}>
          <span style={{ fontWeight: 600, fontSize: 13 }}>Domain Breakdown Summary</span>
          <span className="table-count">{domainSummary.length} domains · 130 controls</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Process Domain</th><th>Total</th><th>Implemented</th><th>In Progress</th>
                <th>Phase 2</th><th>High Risk</th><th>Impl Rate</th><th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {domainSummary.map((d) => (
                <tr key={d.domain}>
                  <td style={{ fontWeight: 500 }}>{d.domain}</td>
                  <td>{d.total}</td>
                  <td><span className="badge badge-teal">{d.implemented}</span></td>
                  <td><span className="badge badge-amber">{d.inProgress}</span></td>
                  <td><span className="badge badge-slate">{d.phase2}</span></td>
                  <td>{d.highRisk > 0 ? <span className="badge badge-red">{d.highRisk}</span> : <span className="badge badge-gray">0</span>}</td>
                  <td style={{ fontWeight: 600, color: d.implRate === 1 ? C.teal : d.implRate > 0.5 ? C.amber : C.red }}>
                    {Math.round(d.implRate * 100)}%
                  </td>
                  <td style={{ width: 120, minWidth: 100 }}>
                    <div className="prog-bar-wrap">
                      <div className="prog-bar" style={{ width: `${d.implRate * 100}%`, background: d.implRate === 1 ? C.teal : d.implRate > 0.5 ? C.amber : C.blue }} />
                    </div>
                  </td>
                </tr>
              ))}
              <tr style={{ background: 'var(--surface2)', fontWeight: 700 }}>
                <td>TOTAL</td><td>130</td>
                <td><span className="badge badge-teal">46</span></td>
                <td><span className="badge badge-amber">58</span></td>
                <td><span className="badge badge-slate">26</span></td>
                <td><span className="badge badge-red">85</span></td>
                <td style={{ color: C.amber }}>35%</td>
                <td><div className="prog-bar-wrap"><div className="prog-bar" style={{ width: '35%', background: C.blue }} /></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
