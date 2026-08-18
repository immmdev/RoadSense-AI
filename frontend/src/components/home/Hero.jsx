import { ArrowRight, Sparkles, MapPinned, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 px-6">
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-10 -right-24 w-[28rem] h-[28rem] rounded-full bg-mint-400/25 blur-3xl" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel shadow-glossy text-xs font-medium text-brand-700 mb-6">
            <Sparkles size={14} />
            Data-driven road safety intelligence
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink-900 leading-[1.08]">
            See where roads
            <span className="block bg-linear-to-r from-brand-500 via-brand-600 to-mint-500 bg-clip-text text-transparent">
              turn dangerous.
            </span>
          </h1>

          <p className="mt-6 text-lg text-ink-600 max-w-xl leading-relaxed">
            UrbanRisk Intelligence turns raw accident records into hotspot maps,
            severity analytics, and a live risk-prediction model — so city
            planners, researchers, and developers can act on it, not just look at it.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-brand-500 to-brand-600 text-white font-semibold shadow-glossy hover:shadow-lg transition-all"
            >
              Explore the dashboard
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-panel font-semibold text-ink-800 hover:bg-white transition-colors"
            >
              Read the API docs
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="glossy-card rounded-3xl p-6 rotate-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold text-ink-800">Live risk snapshot</p>
              <span className="px-2.5 py-1 rounded-full bg-mint-400/15 text-mint-500 text-xs font-semibold">Updated hourly</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <MiniStat icon={<MapPinned size={16} />} label="Hotspots tracked" value="174" tone="brand" />
              <MiniStat icon={<BarChart3 size={16} />} label="Records analyzed" value="60K+" tone="mint" />
            </div>

            <div className="mt-5 rounded-2xl bg-linear-to-br from-brand-50 to-mint-400/10 border border-brand-100 p-4">
              <p className="text-xs text-ink-600 mb-2">Severity mix</p>
              <div className="flex h-2.5 rounded-full overflow-hidden">
                <div className="bg-coral-500" style={{ width: "1%" }} />
                <div className="bg-brand-400" style={{ width: "12%" }} />
                <div className="bg-mint-400" style={{ width: "87%" }} />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-ink-400">
                <span>Fatal</span><span>Serious</span><span>Slight</span>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 glossy-card rounded-2xl px-4 py-3 -rotate-3 shadow-glossy">
            <p className="text-[11px] text-ink-400">Model</p>
            <p className="text-sm font-semibold text-ink-900">Random Forest · risk classifier</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ icon, label, value, tone }) {
  const toneClasses = tone === "mint" ? "bg-mint-400/15 text-mint-500" : "bg-brand-500/10 text-brand-600";
  return (
    <div className="rounded-2xl border border-ink-100 p-3.5">
      <span className={`inline-grid place-items-center w-8 h-8 rounded-lg mb-2 ${toneClasses}`}>{icon}</span>
      <p className="text-xl font-bold text-ink-900 leading-none">{value}</p>
      <p className="text-xs text-ink-400 mt-1">{label}</p>
    </div>
  );
}
