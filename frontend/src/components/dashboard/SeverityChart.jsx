import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";
import ChartCard from "./ChartCard";
import { useApi } from "../../hooks/useApi";
import { analyticsApi } from "../../api/endpoints";
import { Loading, ErrorState } from "../common/StatusState";
import { severityColor } from "../../utils/chartColors";
import { severityIcon } from "../../utils/conditionIcons";

export default function SeverityChart() {
  const { data, error, loading } = useApi(() => analyticsApi.severity(), []);

  return (
    <ChartCard
      icon={PieChartIcon}
      title="How severe are accidents, overall?"
      subtitle="Every recorded accident, grouped by outcome"
      hint="Most accidents are minor ('Slight') — but even a small green slice of Fatal accidents represents real lives, which is why the risk model and hotspot scores weigh severity heavily, not just accident count."
    >
      {loading && <Loading />}
      {error && <ErrorState error={error} />}
      {data && (
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ResponsiveContainer width="100%" height={220} className="sm:max-w-55">
            <PieChart>
              <Pie
                data={data.breakdown}
                dataKey="count"
                nameKey="label"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                cornerRadius={6}
                strokeWidth={0}
              >
                {data.breakdown.map((entry) => (
                  <Cell key={entry.label} fill={severityColor(entry.label)} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #f0eaf7", fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex-1 w-full space-y-3">
            {data.breakdown.map((entry) => {
              const Icon = severityIcon(entry.label);
              const pct = ((entry.count / data.total) * 100).toFixed(1);
              return (
                <div key={entry.label} className="flex items-center gap-3">
                  <span
                    className="grid place-items-center w-8 h-8 rounded-lg shrink-0"
                    style={{ backgroundColor: `${severityColor(entry.label)}22`, color: severityColor(entry.label) }}
                  >
                    <Icon size={16} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-ink-900">{entry.label}</span>
                      <span className="text-sm font-semibold text-ink-900">{pct}%</span>
                    </div>
                    <p className="text-xs text-ink-400">{entry.count.toLocaleString()} accidents</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </ChartCard>
  );
}
