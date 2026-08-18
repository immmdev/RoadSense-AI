import { Lightbulb } from "lucide-react";

export default function ChartCard({ title, subtitle, hint, action, icon: Icon, children, className = "" }) {
  return (
    <div className={`glossy-card rounded-2xl p-6 ${className}`}>
      <div className="flex items-start justify-between mb-5 gap-3">
        <div className="flex items-start gap-2.5">
          {Icon && (
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-brand-500/10 text-brand-600 shrink-0 mt-0.5">
              <Icon size={16} />
            </span>
          )}
          <div>
            <h3 className="font-semibold text-ink-900">{title}</h3>
            {subtitle && <p className="text-xs text-ink-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
      {children}
      {hint && (
        <div className="mt-4 flex items-start gap-2 text-xs text-ink-600 bg-brand-500/5 rounded-xl px-3.5 py-2.5">
          <Lightbulb size={14} className="text-brand-500 shrink-0 mt-0.5" />
          <span>{hint}</span>
        </div>
      )}
    </div>
  );
}
