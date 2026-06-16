import { ReactNode } from "react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div
      className="w-full max-w-md rounded-2xl
                 border border-white/10
                 bg-white/5 backdrop-blur-xl
                 p-8 shadow-2xl"
    >
      {children}
    </div>
  );
}
