export const C = {
  teal:   '#0D9488',   // Implemented — Quantio teal
  amber:  '#F97316',   // In Progress — Quantio orange
  slate:  'rgba(15,23,42,0.30)', // Phase 2 — muted
  red:    '#EF4444',   // High Risk / Missing — Quantio red
  blue:   '#2563EB',   // KPI accent — Quantio blue
};

export const STATUS_COLORS = {
  Implemented: C.teal,
  'In Progress': C.amber,
  'Phase 2': C.slate,
};

export const CHART_THREE = [C.teal, C.amber, C.slate];

export const RISK_COLORSCALE = [
  [0,   C.teal],
  [0.5, C.amber],
  [1,   C.red],
];

export const plotBase = {
  paper_bgcolor: 'transparent',
  plot_bgcolor:  'transparent',
  font: { color: 'rgba(15,23,42,0.50)', size: 11 },
};
