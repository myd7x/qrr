type BadgeProps = {
  label: string;
  type?: "safe" | "warning" | "danger" | "info";
};

export default function Badge({ label, type = "info" }: BadgeProps) {
  let style = "bg-sky-400/10 text-sky-400";

  if (type === "safe") style = "bg-emerald-500/10 text-emerald-400";
  if (type === "warning") style = "bg-amber-400/10 text-amber-400";
  if (type === "danger") style = "bg-red-500/10 text-red-400";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}
    >
      {label}
    </span>
  );
}
