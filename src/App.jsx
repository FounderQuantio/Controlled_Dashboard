import { useState } from 'react';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import ExecutiveDashboard  from './components/ExecutiveDashboard';
import ComplianceRegister  from './components/ComplianceRegister';
import RiskGapAnalysis     from './components/RiskGapAnalysis';
import EvidenceTracker     from './components/EvidenceTracker';
import NationalImpactCalc  from './components/NationalImpactCalc';
import DhanasarGuide       from './components/DhanasarGuide';
import VersionControl      from './components/VersionControl';

const NAV = [
  { id: 'dashboard', label: 'Executive Dashboard',  icon: '①', component: ExecutiveDashboard },
  { id: 'register',  label: 'Compliance Register',  icon: '②', component: ComplianceRegister },
  { id: 'risk',      label: 'Risk & Gap Analysis',  icon: '③', component: RiskGapAnalysis },
  { id: 'evidence',  label: 'Evidence Tracker',     icon: '④', component: EvidenceTracker },
  { id: 'impact',    label: 'National Impact Calc.', icon: '⑤', component: NationalImpactCalc },
  { id: 'dhanasar',  label: 'Dhanasar Guide',       icon: '⑥', component: DhanasarGuide },
  { id: 'versions',  label: 'Version Control',      icon: '⑦', component: VersionControl },
];

export default function App() {
  const [active, setActive]           = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ActivePage = NAV.find((n) => n.id === active)?.component ?? ExecutiveDashboard;

  const handleNav = (id) => {
    setActive(id);
    setSidebarOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <SiteHeader />
      <div className="app" style={{ flex: 1, minHeight: 0, height: 'auto' }}>
      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <button className="hamburger" onClick={() => setSidebarOpen((o) => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <span className="mobile-title">ICM Dashboard</span>
      </div>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`qg-sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
        <div className="qg-sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="qg-nav-logo-badge" style={{ width: 30, height: 30, fontSize: 10 }}>ICM</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--qg-gold)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>ICM Dashboard</div>
              <div style={{ fontSize: 10, color: 'var(--qg-text-3)', marginTop: 1 }}>Federal Compliance</div>
            </div>
          </div>
        </div>

        <nav className="qg-sidebar-nav">
          {NAV.map((n) => (
            <button
              key={n.id}
              className={`qg-sidebar-item${active === n.id ? ' active' : ''}`}
              onClick={() => handleNav(n.id)}
            >
              <span style={{ fontSize: 14, lineHeight: 1 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '14px 14px', borderTop: '1px solid var(--qg-border)', fontSize: 10, color: 'var(--qg-text-4)', lineHeight: 1.7 }}>
          OMB 2 CFR Part 200<br />
          GAO Green Book (2023)<br />
          130 Controls · v2.0 · Apr 2026
        </div>
      </aside>

      <main className="main">
        <ActivePage />
      </main>
      </div>
      <SiteFooter />
    </div>
  );
}
