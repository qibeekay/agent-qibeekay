import React from "react";

export default function Redacted({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-black text-black px-1 mx-0.5 select-none rounded-[1px] hover:bg-black/90 transition-colors cursor-help"
      title="Redacted Information"
    >
      {children}
    </span>
  );
}
