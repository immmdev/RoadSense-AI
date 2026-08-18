import { Database, Cpu, Map, Code2 } from "lucide-react";

const PILLARS = [
  {
    icon: Database,
    title: "Clean, real data",
    text: "We ingest raw accident records, drop invalid coordinates and duplicate reports, and engineer time-of-day and peak-hour features — all documented, none hidden in a notebook.",
  },
  {
    icon: Map,
    title: "Spatial hotspot detection",
    text: "DBSCAN clusters accidents by location density into named hotspots, each scored on severity mix and volume so the worst intersections surface first.",
  },
  {
    icon: Cpu,
    title: "Explainable risk model",
    text: "A severity-risk classifier trained only on pre-crash conditions (time, weather, road type, lighting) predicts risk before an accident happens, not after.",
  },
  {
    icon: Code2,
    title: "Built to integrate",
    text: "Every insight on this site is one documented REST call away — the same API this dashboard uses is open for your own apps, dashboards, or research.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold text-brand-600 mb-3">What we do</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-900">
            One pipeline, from raw CSV to a risk score you can query.
          </h2>
          <p className="mt-4 text-ink-600 leading-relaxed">
            UrbanRisk Intelligence is an end-to-end road-safety analytics platform.
            It cleans historical accident data, finds where and when crashes cluster,
            explains what conditions drive severity, and exposes all of it through a
            documented API — so the analysis doesn't stop at a chart.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glossy-card rounded-2xl p-6 hover:-translate-y-0.5 transition-transform">
              <span className="inline-grid place-items-center w-11 h-11 rounded-xl bg-linear-to-br from-brand-500/10 to-mint-400/10 text-brand-600 mb-4">
                <Icon size={20} />
              </span>
              <h3 className="font-semibold text-ink-900 mb-1.5">{title}</h3>
              <p className="text-sm text-ink-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
