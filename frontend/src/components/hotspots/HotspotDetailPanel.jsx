import { Clock, MapPin } from "lucide-react";
import clsx from "clsx";
import { useApi } from "../../hooks/useApi";
import { hotspotsApi } from "../../api/endpoints";
import { Loading, ErrorState } from "../common/StatusState";
import { RISK_BADGE_CLASSES } from "../../utils/riskColor";

export default function HotspotDetailPanel({ hotspotId }) {
  const { data, error, loading } = useApi(
    () => (hotspotId ? hotspotsApi.get(hotspotId) : Promise.resolve(null)),
    [hotspotId]
  );

  if (!hotspotId) {
    return (
      <div className="glossy-card rounded-2xl p-6 h-full flex items-center justify-center text-center text-sm text-ink-400">
        Select a hotspot on the map or in the list to see its detail.
      </div>
    );
  }

  if (loading) return <div className="glossy-card rounded-2xl"><Loading /></div>;
  if (error) return <div className="glossy-card rounded-2xl"><ErrorState error={error} /></div>;
  if (!data) return null;

  return (
    <div className="glossy-card rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-ink-400 flex items-center gap-1"><MapPin size={12} /> Hotspot #{data.hotspot_id}</p>
          <p className="text-sm text-ink-600 mt-0.5">{data.center_latitude.toFixed(4)}, {data.center_longitude.toFixed(4)}</p>
        </div>
        <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full", RISK_BADGE_CLASSES[data.risk_level])}>
          {data.risk_level} risk
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <MiniStat label="Total" value={data.accident_count} />
        <MiniStat label="Fatal" value={data.fatal_count} tone="coral" />
        <MiniStat label="Serious" value={data.serious_count} tone="brand" />
      </div>

      <div className="flex items-center gap-2 text-sm text-ink-700 mb-5 bg-ink-50 rounded-xl px-3.5 py-2.5">
        <Clock size={14} className="text-brand-600" />
        Peak risk window: <span className="font-semibold">{data.peak_hour_range}</span>
      </div>

      <DetailList title="Top weather at time of crash" items={data.top_weather} />
      <DetailList title="Top road surface conditions" items={data.top_road_surface} className="mt-4" />
    </div>
  );
}

function MiniStat({ label, value, tone }) {
  return (
    <div className="rounded-xl border border-ink-100 px-3 py-2.5 text-center">
      <p className={clsx("text-lg font-bold", tone === "coral" ? "text-coral-500" : tone === "brand" ? "text-brand-600" : "text-ink-900")}>
        {value}
      </p>
      <p className="text-[11px] text-ink-400">{label}</p>
    </div>
  );
}

function DetailList({ title, items, className = "" }) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold text-ink-600 mb-2">{title}</p>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-ink-700">{item.label}</span>
            <span className="text-ink-400">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
