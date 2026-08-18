import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarDays } from "lucide-react";
import ChartCard from "./ChartCard";
import { useApi } from "../../hooks/useApi";
import { analyticsApi } from "../../api/endpoints";
import { Loading, ErrorState } from "../common/StatusState";
import { chartColors } from "../../utils/chartColors";

export default function MonthlyTrendChart() {
  const { data, error, loading } = useApi(() => analyticsApi.monthly(), []);

  const busiest = data ? data.reduce((max, d) => (d.count > max.count ? d : max), data[0]) : null;

  return (
    <ChartCard
      icon={CalendarDays}
      title="Does the season matter?"
      subtitle="Total accidents by month, across the year"
      hint={busiest ? `${busiest.month_label} sees the most accidents. Seasonal shifts like this often line up with weather, daylight hours, or holiday travel.` : undefined}
    >
      {loading && <Loading />}
      {error && <ErrorState error={error} />}
      {data && (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ left: -20 }}>
            <CartesianGrid vertical={false} stroke={chartColors.grid} />
            <XAxis dataKey="month_label" tick={{ fontSize: 11, fill: chartColors.ink }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: chartColors.ink }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: "rgba(157,95,212,0.06)" }}
              contentStyle={{ borderRadius: 12, border: "1px solid #f0eaf7", fontSize: 13 }}
            />
            <Bar dataKey="count" name="Accidents" fill={chartColors.brand} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}
