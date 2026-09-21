type StampTone = "red" | "navy" | "gold";

const tones: Record<StampTone, string> = {
  red: "border-[#b42318] text-[#b42318]",
  navy: "border-[#1b2a4a] text-[#1b2a4a]",
  gold: "border-[#8a6d2a] text-[#8a6d2a]",
};

export function Stamp({
  children,
  tone = "red",
  className = "",
}: {
  children: string;
  tone?: StampTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rotate-[-8deg] border-[3px] px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.18em] uppercase opacity-90 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
