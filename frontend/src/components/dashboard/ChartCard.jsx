export default function ChartCard({ title, subtitle, action, children, className = "" }) {
  return (
    <div className={`glossy-card rounded-2xl p-6 ${className}`}>
      <div className="flex items-start justify-between mb-5 gap-3">
        <div>
          <h3 className="font-semibold text-ink-900">{title}</h3>
          {subtitle && <p className="text-xs text-ink-400 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
