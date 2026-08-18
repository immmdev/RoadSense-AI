import { AlertOctagon, Ambulance, MapPinned, ShieldAlert } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { analyticsApi, hotspotsApi } from "../../api/endpoints";
import { Loading, ErrorState } from "../common/StatusState";

export default function StatsPreview() {
  const severity = useApi(() => analyticsApi.severity(), []);
  const hotspots = useApi(() => hotspotsApi.list(1, 1000), []);

  if (severity.loading || hotspots.loading) return <Loading label="Loading live stats…" />;
  if (severity.error || hotspots.error) return <ErrorState error={severity.error || hotspots.error} />;

  const bySeverity = Object.fromEntries(severity.data.breakdown.map((b) => [b.label, b.count]));
  const criticalHotspots = hotspots.data.filter((h) => h.risk_level === "Critical" || h.risk_level === "High").length;

  const cards = [
    { icon: ShieldAlert, label: "Total accidents", value: severity.data.total.toLocaleString(), tone: "brand" },
    { icon: AlertOctagon, label: "Fatal accidents", value: (bySeverity.Fatal ?? 0).toLocaleString(), tone: "coral" },
    { icon: Ambulance, label: "Serious accidents", value: (bySeverity.Serious ?? 0).toLocaleString(), tone: "amber" },
    { icon: MapPinned, label: "High / critical hotspots", value: criticalHotspots.toLocaleString(), tone: "brand" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(({ icon: Icon, label, value, tone }) => (
            <div key={label} className="glossy-card rounded-2xl p-6">
              <span
                className={`inline-grid place-items-center w-10 h-10 rounded-xl mb-4 ${
                  tone === "coral" ? "bg-coral-500/10 text-coral-500" : tone === "amber" ? "bg-amber-400/20 text-amber-500" : "bg-brand-500/10 text-brand-600"
                }`}
              >
                <Icon size={18} />
              </span>
              <p className="text-2xl font-bold text-ink-900">{value}</p>
              <p className="text-sm text-ink-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
