import { RISK_COLORS } from "../../utils/riskColor";

const DESCRIPTIONS = {
  Low: "Few accidents, mostly minor",
  Moderate: "Worth a second look",
  High: "Frequent or severe accidents",
  Critical: "Highest concentration of severe/fatal accidents",
};

export default function RiskLegend() {
  return (
    <div className="glossy-card rounded-2xl px-5 py-4 flex flex-wrap gap-x-6 gap-y-3">
      {Object.entries(RISK_COLORS).map(([level, color]) => (
        <div key={level} className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
          <div className="leading-tight">
            <p className="text-xs font-semibold text-ink-900">{level}</p>
            <p className="text-[11px] text-ink-400">{DESCRIPTIONS[level]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
