import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartCard from "./ChartCard";
import { useApi } from "../../hooks/useApi";
import { analyticsApi } from "../../api/endpoints";
import { Loading, ErrorState } from "../common/StatusState";
import { chartColors } from "../../utils/chartColors";

export default function YearlyTrendChart() {
  const { data, error, loading } = useApi(() => analyticsApi.yearly(), []);

  return (
    <ChartCard title="Yearly trend" subtitle="Total accidents recorded per year">
      {loading && <Loading />}
      {error && <ErrorState error={error} />}
      {data && (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ left: -20 }}>
            <CartesianGrid vertical={false} stroke={chartColors.grid} />
            <XAxis dataKey="year" tick={{ fontSize: 12, fill: chartColors.ink }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: chartColors.ink }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eef0f9", fontSize: 13 }} />
            <Line type="monotone" dataKey="count" stroke={chartColors.brand} strokeWidth={2.5} dot={{ r: 3, fill: chartColors.brand }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}
