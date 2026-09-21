import { CASE_NUMBER, MAKER } from "@/lib/config";
import { Seal } from "@/components/Seal";

export function OfficialBanner() {
  return (
    <div className="border-b border-[#1b2a4a] bg-[#1b2a4a] text-[#f4efe4]">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-2 font-mono text-[10px] tracking-widest uppercase sm:text-[11px]">
        <span>Office of Coming Over</span>
        <span className="hidden sm:inline">Clerk: {MAKER}</span>
        <span>Case {CASE_NUMBER}</span>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b-4 border-[#1b2a4a] bg-[#f4efe4]">
      <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-4 sm:py-5">
        <Seal size={72} />
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.28em] text-[#8a6d2a] uppercase">
            An unofficial website of a very official crush
          </p>
          <h1 className="font-serif text-[1.55rem] leading-none tracking-tight text-[#1b2a4a] sm:text-3xl">
            The Department of Going Out
          </h1>
          <p className="mt-1 font-mono text-[11px] text-[#5c4a3a]">
            Established tonight · Mostly vibes, some snacks
          </p>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#c9b8a0] bg-[#efe6d4] print:hidden">
      <div className="mx-auto max-w-3xl px-4 py-4 font-mono text-[10px] leading-relaxed text-[#5c4a3a] uppercase">
        <p>
          Not a real government. A real “come over.” The seal is clip art energy.
        </p>
        <p className="mt-1">
          FOIA requests may be a text that just says “omw.”
        </p>
        <p className="mt-3 border-t border-[#c9b8a0] pt-3 font-serif text-sm normal-case tracking-normal text-[#1b2a4a]">
          Made by {MAKER}
        </p>
      </div>
    </footer>
  );
}

export function WarningTape() {
  return (
    <div className="border-b border-[#8a6d2a] bg-[#f5d76e] print:hidden">
      <p className="mx-auto max-w-3xl px-4 py-2 text-center font-mono text-[11px] font-medium text-[#1b2a4a]">
        Notice: Not a real .gov. The laptop has been charged. It is excited.
      </p>
    </div>
  );
}
