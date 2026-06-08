export const C = {
  teal:   '#00897B',   // Implemented — deep teal, signals compliance/progress
  amber:  '#F57F17',   // In Progress — action required
  slate:  '#546E7A',   // Phase 2 — neutral/planned
  red:    '#C62828',   // High Risk / Missing — alert
  blue:   '#1565C0',   // Federal Blue — authority, totals, KPI accents
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
  font: { color: '#94a3b8', size: 11 },
};
