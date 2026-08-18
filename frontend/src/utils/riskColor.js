export const RISK_COLORS = {
  Low: "#33d1a6",
  Moderate: "#5b74fa",
  High: "#ff9d8a",
  Critical: "#ff7a61",
};

export const RISK_BADGE_CLASSES = {
  Low: "bg-mint-400/15 text-mint-500",
  Moderate: "bg-brand-500/10 text-brand-600",
  High: "bg-coral-400/15 text-coral-500",
  Critical: "bg-coral-500/20 text-coral-500",
};

export function riskColor(level) {
  return RISK_COLORS[level] || RISK_COLORS.Moderate;
}
