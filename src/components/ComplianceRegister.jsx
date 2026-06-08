import { useState, useMemo } from 'react';
import { controls } from '../data/icmData';

function statusBadge(s) {
  if (s === 'Implemented') return <span className="badge badge-green">Implemented</span>;
  if (s === 'In progress') return <span className="badge badge-yellow">In Progress</span>;
  return <span className="badge badge-purple">Phase 2</span>;
}
function riskBadge(r) {
  if (r === 'High')   return <span className="badge badge-red">High</span>;
  if (r === 'Medium') return <span className="badge badge-yellow">Medium</span>;
  return <span className="badge badge-gray">Low</span>;
}
function evidBadge(e) {
  return e === 'Yes'
    ? <span className="badge badge-green">Yes</span>
    : <span className="badge badge-red">No</span>;
}

const unique = (arr, key) => [...new Set(arr.map((i) => i[key]))].sort();

export default function ComplianceRegister() {
  const [search, setSearch] = useState('');
  const [statusF, setStatusF] = useState('');
  const [riskF, setRiskF] = useState('');
  const [domainF, setDomainF] = useState('');
  const [subpartF, setSubpartF] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return controls.filter((c) => {
      if (q && !c.id.toLowerCase().includes(q) && !c.domain.toLowerCase().includes(q) && !c.cfr.toLowerCase().includes(q) && !c.owner.toLowerCase().includes(q)) return false;
      if (statusF && !c.status.includes(statusF)) return false;
      if (riskF && c.risk !== riskF) return false;
      if (domainF && c.domain !== domainF) return false;
      if (subpartF && c.subpart !== subpartF) return false;
      return true;
    });
  }, [search, statusF, riskF, domainF, subpartF]);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Compliance Register</h2>
        <p>All 130 controls — ICM-001 to ICM-130 · OMB 2 CFR Part 200 · All 22 diagnostic issues corrected</p>
      </div>

      <div className="table-wrap">
        <div className="table-toolbar">
          <input className="search-input" placeholder="Search ID, domain, CFR, owner…" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="filter-select" value={statusF} onChange={(e) => setStatusF(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Implemented">Implemented</option>
            <option value="In progress">In Progress</option>
            <option value="Phase 2">Phase 2</option>
          </select>
          <select className="filter-select" value={riskF} onChange={(e) => setRiskF(e.target.value)}>
            <option value="">All Risks</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select className="filter-select" value={domainF} onChange={(e) => setDomainF(e.target.value)}>
            <option value="">All Domains</option>
            {unique(controls, 'domain').map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="filter-select" value={subpartF} onChange={(e) => setSubpartF(e.target.value)}>
            <option value="">All Subparts</option>
            {unique(controls, 'subpart').map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="table-count">{filtered.length} / {controls.length} controls</span>
        </div>
        <div className="table-scroll" style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Control ID</th>
                <th>Subpart</th>
                <th>Process Domain</th>
                <th>CFR Reference</th>
                <th>GAO Reference</th>
                <th>Control Owner</th>
                <th>Status</th>
                <th>Risk</th>
                <th>Evidence</th>
                <th>System</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 700, color: 'var(--accent)', whiteSpace: 'nowrap' }}>{c.id}</td>
                  <td style={{ whiteSpace: 'nowrap', color: 'var(--muted)' }}>{c.subpart}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{c.domain}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--muted)' }}>{c.cfr}</td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{c.gao}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{c.owner}</td>
                  <td>{statusBadge(c.status)}</td>
                  <td>{riskBadge(c.risk)}</td>
                  <td>{evidBadge(c.evidence)}</td>
                  <td>
                    {c.systemUpdated === 'Updated'
                      ? <span className="badge badge-green">Updated</span>
                      : <span className="badge badge-red">Not Updated</span>}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} style={{ textAlign: 'center', color: 'var(--muted)', padding: '32px' }}>No controls match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
