export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-zinc-800
                  bg-zinc-900/60 backdrop-blur p-6 ${className || ""}`}
    >
      {children}
    </div>
  );
}
