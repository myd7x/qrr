type Props = {
  score: number;
  color: "green" | "lightgreen" | "yellow" | "red";
};

const colorMap = {
  green: "bg-green-500",
  lightgreen: "bg-emerald-400",
  yellow: "bg-yellow-400",
  red: "bg-red-500",
};

export default function RiskBar({ score, color }: Props) {
  return (
    <div>
      <div className="flex justify-between text-xs text-zinc-400 mb-1">
        <span>Risk Score</span>
        <span>{score} / 100</span>
      </div>

      <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className={`h-full ${colorMap[color]} transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
