type InputProps = {
  placeholder?: string;
  type?: string;
  className?: string;
};

export default function Input({
  placeholder,
  type = "text",
  className,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full rounded-lg bg-zinc-950
                  border border-zinc-700 px-4 py-3
                  text-zinc-200 placeholder:text-zinc-500
                  focus:outline-none focus:border-emerald-500
                  ${className || ""}`}
    />
  );
}
