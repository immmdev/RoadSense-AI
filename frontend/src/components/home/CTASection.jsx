import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-600 via-brand-500 to-mint-500 px-8 py-14 sm:px-14 text-center shadow-glossy">
          <div className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-white/10 blur-2xl" />

          <h2 className="relative text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Plug road-risk data into your own project
          </h2>
          <p className="relative mt-3 text-brand-50/90 max-w-xl mx-auto">
            The full REST API behind this dashboard is documented and ready to integrate —
            analytics, hotspots, and predictions in a handful of calls.
          </p>
          <div className="relative mt-8 flex justify-center gap-3 flex-wrap">
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-brand-700 font-semibold shadow-glossy hover:shadow-lg transition-shadow"
            >
              Get started with the API
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
