import { versionHistory } from '../data/icmData';

export default function VersionControl() {
  return (
    <div className="page">
      <div className="page-header">
        <h2>Version Control</h2>
        <p>ICM development history &amp; changelog — demonstrates sustained professional development effort over time</p>
      </div>

      <div className="section-card">
        <h3>ICM Development Timeline</h3>
        <div className="timeline">
          {versionHistory.map((v, i) => (
            <div key={v.version} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-version">{v.version}</div>
              <div className="timeline-date">{v.date}</div>
              <div className="timeline-changes">{v.changes}</div>
              <div className="timeline-basis">Basis: {v.basis}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-card">
        <h3>Changelog Summary</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface2)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted)', whiteSpace: 'nowrap' }}>Version</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted)' }}>Date</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted)' }}>Key Changes</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted)' }}>Basis for Change</th>
              </tr>
            </thead>
            <tbody>
              {versionHistory.map((v, i) => (
                <tr key={v.version} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: i === versionHistory.length - 1 ? 'var(--green)' : 'var(--accent)', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{v.version}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--muted)', whiteSpace: 'nowrap', fontSize: 12 }}>{v.date}</td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>{v.changes}</td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.6 }}>{v.basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section-card">
        <h3 style={{ color: 'var(--muted)', marginBottom: 16 }}>Document Metadata</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {[
            ['Author', 'Muhammad Bilal FCA|FCCA|CFA'],
            ['Current Version', 'v2.0'],
            ['Last Updated', 'April 2026'],
            ['Total Controls', '130'],
            ['Regulatory Framework', 'OMB 2 CFR Part 200'],
            ['Audit Standard', 'GAO Green Book (2023)'],
            ['Issues Corrected', 'All 22 diagnostic issues'],
            ['Repository', 'github.com/bilalgovernance/icm'],
            ['License', 'Creative Commons CC-BY 4.0'],
            ['Purpose', 'USCIS NIW Petition Exhibit'],
          ].map(([label, val]) => (
            <div key={label} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
