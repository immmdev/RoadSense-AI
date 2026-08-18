import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartCard from "./ChartCard";
import { useApi } from "../../hooks/useApi";
import { analyticsApi } from "../../api/endpoints";
import { Loading, ErrorState } from "../common/StatusState";
import { chartColors } from "../../utils/chartColors";

const DIMENSIONS = [
  { key: "weather", label: "Weather" },
  { key: "road_surface", label: "Road surface" },
  { key: "light", label: "Light conditions" },
  { key: "road_type", label: "Road type" },
  { key: "urban_rural", label: "Urban / rural" },
  { key: "junction_detail", label: "Junction detail" },
  { key: "time_of_day", label: "Time of day" },
];

export default function DimensionExplorer() {
  const [dimension, setDimension] = useState("weather");
  const { data, error, loading } = useApi(() => analyticsApi.byDimension(dimension), [dimension]);

  return (
    <ChartCard
      title="Breakdown by condition"
      subtitle="Which conditions accidents happen under"
      className="col-span-full"
      action={
        <select
          value={dimension}
          onChange={(e) => setDimension(e.target.value)}
          className="text-sm bg-white border border-ink-100 rounded-lg px-3 py-1.5 text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          {DIMENSIONS.map((d) => (
            <option key={d.key} value={d.key}>{d.label}</option>
          ))}
        </select>
      }
    >
      {loading && <Loading />}
      {error && <ErrorState error={error} />}
      {data && (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} layout="vertical" margin={{ left: 24 }}>
            <CartesianGrid horizontal={false} stroke={chartColors.grid} />
            <XAxis type="number" tick={{ fontSize: 11, fill: chartColors.ink }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="label"
              width={140}
              tick={{ fontSize: 11, fill: chartColors.ink }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eef0f9", fontSize: 13 }} cursor={{ fill: "rgba(91,116,250,0.06)" }} />
            <Bar dataKey="count" fill={chartColors.brand} radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}
