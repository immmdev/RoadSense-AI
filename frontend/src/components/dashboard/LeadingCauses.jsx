import { ListChecks } from "lucide-react";
import ChartCard from "./ChartCard";
import { useApi } from "../../hooks/useApi";
import { analyticsApi } from "../../api/endpoints";
import { Loading, ErrorState } from "../common/StatusState";
import { weatherIcon, surfaceIcon, lightIcon } from "../../utils/conditionIcons";
import { categoricalColor } from "../../utils/chartColors";

export default function LeadingCauses() {
  const { data, error, loading } = useApi(() => analyticsApi.leadingCauses(6), []);

  return (
    <ChartCard
      icon={ListChecks}
      title="What do serious crashes have in common?"
      subtitle="The most frequent weather + road surface + lighting combinations among Fatal and Serious accidents"
      hint="This isn't a single 'cause' field from the data — it's the most common combination of conditions present when a serious crash happened. Treat it as a pattern to watch for, not a guaranteed trigger."
      className="col-span-full"
    >
      {loading && <Loading />}
      {error && <ErrorState error={error} />}
      {data && (
        <div className="space-y-2">
          {data.map((cause, i) => {
            const WeatherIcon = weatherIcon(cause.weather);
            const SurfaceIcon = surfaceIcon(cause.road_surface);
            const LightIcon = lightIcon(cause.light);
            const color = categoricalColor(i);
            return (
              <div
                key={`${cause.weather}-${cause.road_surface}-${cause.light}`}
                className="flex items-center gap-4 rounded-xl border border-ink-100 px-4 py-3"
              >
                <span
                  className="grid place-items-center w-7 h-7 rounded-full text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {i + 1}
                </span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 flex-1 min-w-0">
                  <span className="flex items-center gap-1.5 text-sm text-ink-700">
                    <WeatherIcon size={14} className="text-ink-400" /> {cause.weather}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-ink-700">
                    <SurfaceIcon size={14} className="text-ink-400" /> {cause.road_surface}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-ink-700">
                    <LightIcon size={14} className="text-ink-400" /> {cause.light}
                  </span>
                </div>
                <span className="text-sm font-semibold text-coral-500 shrink-0">
                  {cause.severe_accident_count.toLocaleString()} severe
                </span>
              </div>
            );
          })}
        </div>
      )}
    </ChartCard>
  );
}
