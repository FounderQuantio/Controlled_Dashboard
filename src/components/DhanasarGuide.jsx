import { dhanasarProngs } from '../data/icmData';
import InfoTooltip from './InfoTooltip';

const prongColors = {
  'Prong 1': { bg: '#1e3a5f', badge: '#3b82f6', text: '#93c5fd' },
  'Prong 2': { bg: '#064e3b', badge: '#10b981', text: '#6ee7b7' },
  'Prong 3': { bg: '#1a2e44', badge: '#F57F17', text: '#FFCC80' },
};

export default function DhanasarGuide() {
  return (
    <div className="page">
      <div className="page-header">
        <h2>Dhanasar Relevance Guide</h2>
        <p>USCIS NIW Petition Mapping — Each dashboard component mapped to the three-prong Dhanasar test</p>
      </div>

      {dhanasarProngs.map((prong) => {
        const c = prongColors[prong.prong];
        return (
          <div key={prong.prong} className="prong-card">
            <div className="prong-header" style={{ background: c.bg }}>
              <span className="prong-badge" style={{ background: c.badge, color: '#fff' }}>{prong.prong}</span>
              <h3 style={{ color: c.text }}>{prong.title}</h3>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--surface2)' }}>
                    <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted)', width: '22%' }}>ICM / Dashboard Element</th>
                    <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted)', width: '30%' }}>What It Proves</th>
                    <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted)', width: '33%' }}>Why USCIS Will Accept It</th>
                    <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted)', width: '15%' }}>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {prong.items.map((item, i) => (
                    <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 600, fontSize: 13, color: c.text, verticalAlign: 'top' }}>{item.element}</td>
                      <td style={{ padding: '14px 20px', fontSize: 12, color: 'var(--muted)', verticalAlign: 'top', lineHeight: 1.6, position: 'relative' }}>
                        {item.proves}
                        {item.note && <InfoTooltip text={item.note} />}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: 12, color: '#a5f3fc', verticalAlign: 'top', lineHeight: 1.6 }}>{item.whyUSCIS}</td>
                      <td style={{ padding: '14px 20px', fontSize: 11, color: 'var(--muted)', verticalAlign: 'top', fontStyle: 'italic' }}>{item.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <div className="section-card" style={{ marginTop: 8 }}>
        <h3 style={{ color: 'var(--accent)', marginBottom: 12 }}>Key GAO Reports Referenced</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {[
            ['GAO-14-704G', 'Green Book — Internal Control Standards'],
            ['GAO-23-105678', 'Improper Payments & Financial Management'],
            ['GAO-23-106099', 'Single Audit Requirements (Subpart F)'],
            ['GAO-22-105558', 'Pre-Award Controls & Grants Management'],
            ['GAO-22-105220', 'Equipment / Property Management'],
            ['GAO-21-264', 'Grant Closeout Requirements'],
            ['GAO-21-105', 'Records Retention Standards'],
            ['GAO-20-195', 'Federal Procurement Standards'],
            ['GAO-23-105516', 'Program Performance Reporting'],
            ['GAO-14-468', 'Subrecipient Monitoring'],
          ].map(([ref, desc]) => (
            <div key={ref} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)', fontWeight: 700 }}>{ref}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
