import { BarChart3 } from "lucide-react";
import SeverityChart from "../components/dashboard/SeverityChart";
import HourlyChart from "../components/dashboard/HourlyChart";
import YearlyTrendChart from "../components/dashboard/YearlyTrendChart";
import DimensionExplorer from "../components/dashboard/DimensionExplorer";

export default function DashboardPage() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <PageHeader
        icon={BarChart3}
        title="Analytics dashboard"
        subtitle="Live aggregations straight from the accidents dataset via the UrbanRisk API."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <HourlyChart />
        <SeverityChart />
        <YearlyTrendChart />
        <DimensionExplorer />
      </div>
    </div>
  );
}

export function PageHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="grid place-items-center w-9 h-9 rounded-xl bg-linear-to-br from-brand-500 to-mint-400 text-white shadow-glossy">
          <Icon size={17} />
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">{title}</h1>
      </div>
      {subtitle && <p className="text-ink-600 max-w-2xl">{subtitle}</p>}
    </div>
  );
}
