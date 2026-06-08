import { useState, useEffect } from 'react';
import ExecutiveDashboard  from './components/ExecutiveDashboard';
import ComplianceRegister  from './components/ComplianceRegister';
import RiskGapAnalysis     from './components/RiskGapAnalysis';
import EvidenceTracker     from './components/EvidenceTracker';
import NationalImpactCalc  from './components/NationalImpactCalc';
import DhanasarGuide       from './components/DhanasarGuide';
import VersionControl      from './components/VersionControl';

const NAV = [
  { id: 'dashboard',  label: 'Executive Dashboard',       icon: '①', component: ExecutiveDashboard },
  { id: 'register',   label: 'Compliance Register',        icon: '②', component: ComplianceRegister },
  { id: 'risk',       label: 'Risk & Gap Analysis',        icon: '③', component: RiskGapAnalysis },
  { id: 'evidence',   label: 'Evidence Tracker',           icon: '④', component: EvidenceTracker },
  { id: 'impact',     label: 'National Impact Calc.',      icon: '⑤', component: NationalImpactCalc },
  { id: 'dhanasar',   label: 'Dhanasar Guide',             icon: '⑥', component: DhanasarGuide },
  { id: 'versions',   label: 'Version Control',            icon: '⑦', component: VersionControl },
];

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [dark, setDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const ActivePage = NAV.find((n) => n.id === active)?.component ?? ExecutiveDashboard;

  const handleNav = (id) => {
    setActive(id);
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <button className="hamburger" onClick={() => setSidebarOpen((o) => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <span className="mobile-title">ICM Dashboard</span>
        <button className="theme-toggle-icon" onClick={() => setDark((d) => !d)}>
          {dark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <h1>ICM Dashboard</h1>
          <p>Federal Grant Compliance</p>
        </div>
        <nav className="sidebar-nav">
          {NAV.map((n) => (
            <button
              key={n.id}
              className={`nav-item${active === n.id ? ' active' : ''}`}
              onClick={() => handleNav(n.id)}
            >
              <span className="nav-icon">{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="theme-toggle" onClick={() => setDark((d) => !d)}>
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/></svg>
            )}
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <div style={{ marginTop: 10 }}>
            OMB 2 CFR Part 200<br />
            GAO Green Book (2023)<br />
            130 Controls · v2.0 · Apr 2026
          </div>
        </div>
      </aside>

      <main className="main">
        <ActivePage />
      </main>
    </div>
  );
}
