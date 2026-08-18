import clsx from "clsx";
import { RISK_BADGE_CLASSES } from "../../utils/riskColor";

export default function HotspotList({ hotspots, selectedId, onSelect }) {
  return (
    <div className="glossy-card rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-ink-100">
        <h3 className="font-semibold text-ink-900 text-sm">Ranked hotspots</h3>
        <p className="text-xs text-ink-400">{hotspots.length} clusters, sorted by risk score</p>
      </div>
      <div className="max-h-[440px] overflow-y-auto scrollbar-thin">
        {hotspots.map((h) => (
          <button
            key={h.hotspot_id}
            onClick={() => onSelect(h.hotspot_id)}
            className={clsx(
              "w-full text-left px-5 py-3.5 border-b border-ink-50 flex items-center justify-between gap-3 transition-colors",
              h.hotspot_id === selectedId ? "bg-brand-500/5" : "hover:bg-ink-50"
            )}
          >
            <div>
              <p className="text-sm font-medium text-ink-900">Hotspot #{h.hotspot_id}</p>
              <p className="text-xs text-ink-400">{h.accident_count} accidents · {h.fatal_count} fatal</p>
            </div>
            <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full shrink-0", RISK_BADGE_CLASSES[h.risk_level])}>
              {h.risk_level}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
