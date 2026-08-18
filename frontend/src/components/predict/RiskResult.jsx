import clsx from "clsx";
import { Gauge, ListTree } from "lucide-react";
import { RISK_BADGE_CLASSES, riskColor } from "../../utils/riskColor";

export default function RiskResult({ result }) {
  if (!result) {
    return (
      <div className="glossy-card rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center gap-3 text-ink-400">
        <Gauge size={28} />
        <p className="text-sm max-w-[220px]">Fill in the conditions and estimate risk to see a result here.</p>
      </div>
    );
  }

  const pct = Math.round(result.severe_probability * 100);

  return (
    <div className="glossy-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-ink-600">Risk estimate</p>
        <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full", RISK_BADGE_CLASSES[result.risk_level])}>
          {result.risk_level}
        </span>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div
          className="relative w-32 h-32 rounded-full grid place-items-center"
          style={{
            background: `conic-gradient(${riskColor(result.risk_level)} ${pct * 3.6}deg, #eef0f9 0deg)`,
          }}
        >
          <div className="w-24 h-24 rounded-full bg-white grid place-items-center flex-col">
            <p className="text-2xl font-bold text-ink-900">{pct}%</p>
            <p className="text-[10px] text-ink-400 -mt-0.5">severe chance</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-ink-700">
          Most likely outcome: <span className="font-semibold">{result.predicted_severity_label}</span>
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold text-ink-600 mb-3 flex items-center gap-1.5">
          <ListTree size={13} /> Top contributing factors (model-wide importance)
        </p>
        <div className="space-y-2.5">
          {result.top_factors.map((f) => (
            <div key={f.feature}>
              <div className="flex justify-between text-xs text-ink-600 mb-1">
                <span className="truncate max-w-[70%]">{f.feature.replaceAll("_", " ")}</span>
                <span>{(f.contribution * 100).toFixed(1)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-brand-400 to-brand-600"
                  style={{ width: `${Math.min(100, f.contribution * 400)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
