import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartCard from "./ChartCard";
import { useApi } from "../../hooks/useApi";
import { analyticsApi } from "../../api/endpoints";
import { Loading, ErrorState } from "../common/StatusState";
import { chartColors, severityColor } from "../../utils/chartColors";

export default function SeverityChart() {
  const { data, error, loading } = useApi(() => analyticsApi.severity(), []);

  return (
    <ChartCard title="Severity breakdown" subtitle="All recorded accidents, by outcome">
      {loading && <Loading />}
      {error && <ErrorState error={error} />}
      {data && (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.breakdown} margin={{ left: -20 }}>
            <CartesianGrid vertical={false} stroke={chartColors.grid} />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: chartColors.ink }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: chartColors.ink }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: "rgba(91,116,250,0.06)" }}
              contentStyle={{ borderRadius: 12, border: "1px solid #eef0f9", fontSize: 13 }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {data.breakdown.map((entry) => (
                <Cell key={entry.label} fill={severityColor(entry.label)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}
