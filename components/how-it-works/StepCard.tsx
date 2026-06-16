import { ReactNode } from "react";

export default function StepCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div
      data-step
      className="relative rounded-2xl border border-zinc-800
                 bg-zinc-900/60 backdrop-blur
                 p-6 shadow-lg"
    >
      <div className="mb-4 text-emerald-400 text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>
      <p className="text-zinc-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
