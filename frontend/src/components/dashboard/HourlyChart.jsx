import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartCard from "./ChartCard";
import { useApi } from "../../hooks/useApi";
import { analyticsApi } from "../../api/endpoints";
import { Loading, ErrorState } from "../common/StatusState";
import { chartColors } from "../../utils/chartColors";

export default function HourlyChart() {
  const { data, error, loading } = useApi(() => analyticsApi.hourly(), []);

  return (
    <ChartCard title="Accidents by hour" subtitle="24-hour distribution, split by severity" className="col-span-full lg:col-span-2">
      {loading && <Loading />}
      {error && <ErrorState error={error} />}
      {data && (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ left: -20 }}>
            <defs>
              <linearGradient id="slightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColors.slight} stopOpacity={0.35} />
                <stop offset="100%" stopColor={chartColors.slight} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="seriousGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColors.serious} stopOpacity={0.35} />
                <stop offset="100%" stopColor={chartColors.serious} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fatalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColors.fatal} stopOpacity={0.5} />
                <stop offset="100%" stopColor={chartColors.fatal} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={chartColors.grid} />
            <XAxis dataKey="hour" tick={{ fontSize: 11, fill: chartColors.ink }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: chartColors.ink }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eef0f9", fontSize: 13 }} />
            <Area type="monotone" dataKey="slight_count" name="Slight" stackId="1" stroke={chartColors.slight} fill="url(#slightGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="serious_count" name="Serious" stackId="1" stroke={chartColors.serious} fill="url(#seriousGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="fatal_count" name="Fatal" stackId="1" stroke={chartColors.fatal} fill="url(#fatalGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}
