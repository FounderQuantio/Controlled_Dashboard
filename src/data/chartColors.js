export const C = {
  teal:   '#2DD4BF',   // Implemented — Quantio teal
  amber:  '#F97316',   // In Progress — Quantio orange
  slate:  'rgba(255,255,255,0.30)', // Phase 2 — muted
  red:    '#EF4444',   // High Risk / Missing — Quantio red
  blue:   '#C9A84C',   // KPI accent — Quantio gold
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
  font: { color: 'rgba(255,255,255,0.50)', size: 11 },
};
