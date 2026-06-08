import { useState, useMemo } from 'react';
import Plot from './PlotChart';
import { evidenceGaps, evidenceSummaryByDomain } from '../data/icmData';
import { C, plotBase } from '../data/chartColors';

const cfg = { displayModeBar: false, responsive: true };

export default function EvidenceTracker() {
  const [search, setSearch] = useState('');
  const [domainF, setDomainF] = useState('');

  const domains = [...new Set(evidenceGaps.map((e) => e.domain))].sort();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return evidenceGaps.filter((e) => {
      if (q && !e.id.toLowerCase().includes(q) && !e.domain.toLowerCase().includes(q) && !e.cfr.toLowerCase().includes(q) && !e.owner.toLowerCase().includes(q)) return false;
      if (domainF && e.domain !== domainF) return false;
      return true;
    });
  }, [search, domainF]);

  const barData = [
    {
      x: evidenceSummaryByDomain.map((d) => d.collected),
      y: evidenceSummaryByDomain.map((d) => d.domain),
      type: 'bar', orientation: 'h', name: 'Collected',
      marker: { color: C.teal },
      hovertemplate: '<b>%{y}</b><br>Collected: %{x}<extra></extra>',
    },
    {
      x: evidenceSummaryByDomain.map((d) => d.missing),
      y: evidenceSummaryByDomain.map((d) => d.domain),
      type: 'bar', orientation: 'h', name: 'Missing',
      marker: { color: C.red },
      hovertemplate: '<b>%{y}</b><br>Missing: %{x}<extra></extra>',
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h2>Evidence Tracker</h2>
        <p>Audit readiness gap register · Evidence Collected: 72 (55%) · Missing: 58 (45%) · Sorted by urgency</p>
      </div>

      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="kpi-card blue"><div className="label">Total Controls</div><div className="value">130</div></div>
        <div className="kpi-card green"><div className="label">Evidence Collected</div><div className="value">72</div><div className="sub">55% rate</div></div>
        <div className="kpi-card red"><div className="label">Evidence Missing</div><div className="value">58</div></div>
        <div className="kpi-card yellow"><div className="label">System Not Updated</div><div className="value">69</div></div>
      </div>

      <div className="chart-card" style={{ marginBottom: 24 }}>
        <h3>Evidence Availability by Domain</h3>
        <Plot
          data={barData}
          layout={{
            ...plotBase,
            barmode: 'stack', height: 320,
            xaxis: { gridcolor: '#334155', color: '#94a3b8' },
            yaxis: { color: '#94a3b8', automargin: true },
            margin: { t: 10, b: 30, l: 170, r: 10 },
            legend: { orientation: 'h', y: -0.15, font: { color: '#94a3b8', size: 11 }, bgcolor: 'transparent' },
          }}
          config={cfg} style={{ width: '100%' }}
        />
      </div>

      <div className="table-wrap">
        <div className="table-toolbar">
          <input className="search-input" placeholder="Search ID, domain, CFR, owner…" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="filter-select" value={domainF} onChange={(e) => setDomainF(e.target.value)}>
            <option value="">All Domains</option>
            {domains.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <span className="table-count">{filtered.length} / {evidenceGaps.length} gaps</span>
        </div>
        <div className="table-scroll" style={{ maxHeight: 'calc(100vh - 330px)', overflowY: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Control ID</th>
                <th>Domain</th>
                <th>Status</th>
                <th>CFR Ref.</th>
                <th>Owner</th>
                <th>Documentation Required</th>
                <th>Test Procedure</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id}>
                  <td style={{ fontWeight: 700, color: 'var(--accent)', whiteSpace: 'nowrap' }}>{e.id}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{e.domain}</td>
                  <td>
                    {e.status === 'Implemented'
                      ? <span className="badge badge-green">Implemented</span>
                      : e.status === 'In progress'
                      ? <span className="badge badge-yellow">In Progress</span>
                      : <span className="badge badge-purple">Phase 2</span>}
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{e.cfr}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{e.owner}</td>
                  <td style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 260 }}>{e.docRequired}</td>
                  <td style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 280 }}>{e.testProcedure}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--muted)', padding: '32px' }}>No evidence gaps match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
