export default function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-ink-600 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

export const selectClasses =
  "w-full text-sm bg-white border border-ink-100 rounded-xl px-3.5 py-2.5 text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-300";
