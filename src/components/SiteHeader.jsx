import { useState } from "react";

const GOLD = "#3D5A99";
const HOME_URL = "https://quantioglobal.net";
const NAV_LINKS = ["About", "Services", "Platforms", "Vision", "Contact"];

function NavLink({ label, mobile, onNavigate }) {
  return (
    <a
      href={`${HOME_URL}/#${label.toLowerCase()}`}
      onClick={onNavigate}
      style={mobile ? {
        color: "rgba(255,255,255,0.85)", fontSize: 15, fontWeight: 600,
        textDecoration: "none", padding: "13px 16px", borderRadius: 10,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        display: "block", width: "100%", boxSizing: "border-box",
      } : {
        color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500,
        textDecoration: "none", padding: "7px 16px", borderRadius: 100,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.14)",
        transition: "all 0.18s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = "#FFFFFF";
        e.currentTarget.style.background = "rgba(61,90,153,0.35)";
        e.currentTarget.style.borderColor = "rgba(61,90,153,0.55)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = mobile ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.75)";
        e.currentTarget.style.background = mobile ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)";
        e.currentTarget.style.borderColor = mobile ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.14)";
      }}
    >{label}</a>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .qg-nav-desktop { display: flex; gap: 6px; }
        .qg-nav-home-desktop { display: inline-block; }
        .qg-nav-toggle { display: none; }
        @media (max-width: 860px) {
          .qg-nav-desktop { display: none; }
          .qg-nav-home-desktop { display: none; }
          .qg-nav-toggle { display: flex; }
        }
      `}</style>
      <nav style={{
        background: "#1F3A5F", padding: "14px 20px",
        display: "flex", alignItems: "center", gap: 6,
        borderBottom: "1px solid rgba(255,255,255,0.10)", flexShrink: 0,
        position: "relative",
      }}>
        <a href={HOME_URL} style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 24, textDecoration: "none", flexShrink: 0 }}>
          <img src="/qg-logo-gold.png" alt="Quantio Global" style={{ width: 40, height: "auto" }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#FFFFFF", letterSpacing: 2.5, textTransform: "uppercase", lineHeight: 1 }}>Quantio</div>
            <div style={{ fontSize: 8, fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: 3.5, textTransform: "uppercase", marginTop: 2 }}>Global</div>
          </div>
        </a>

        <div className="qg-nav-desktop">
          {NAV_LINKS.map(l => <NavLink key={l} label={l} />)}
        </div>

        <div className="qg-nav-home-desktop" style={{ marginLeft: "auto" }}>
          <a href={HOME_URL} style={{
            background: GOLD, color: "#FFFFFF", fontSize: 13, fontWeight: 700,
            padding: "9px 22px", borderRadius: 100, textDecoration: "none", display: "inline-block",
          }}>Home page</a>
        </div>

        <button
          className="qg-nav-toggle"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          style={{
            marginLeft: "auto", background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.16)", borderRadius: 8,
            width: 42, height: 42, alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexDirection: "column", gap: 4, flexShrink: 0,
          }}
        >
          <span style={{ width: 18, height: 2, background: "#fff", borderRadius: 2, transition: "transform 0.2s", transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ width: 18, height: 2, background: "#fff", borderRadius: 2, opacity: open ? 0 : 1, transition: "opacity 0.2s" }} />
          <span style={{ width: 18, height: 2, background: "#fff", borderRadius: 2, transition: "transform 0.2s", transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>

        {open && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "#1F3A5F", borderTop: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
            padding: 16, display: "flex", flexDirection: "column", gap: 8, zIndex: 100,
          }}>
            {NAV_LINKS.map(l => <NavLink key={l} label={l} mobile onNavigate={() => setOpen(false)} />)}
            <a
              href={HOME_URL}
              onClick={() => setOpen(false)}
              style={{
                background: GOLD, color: "#FFFFFF", fontSize: 15, fontWeight: 700,
                padding: "13px 16px", borderRadius: 10, textDecoration: "none",
                textAlign: "center", marginTop: 4,
              }}
            >Home page</a>
          </div>
        )}
      </nav>
    </>
  );
}
