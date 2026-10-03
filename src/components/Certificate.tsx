"use client";

import { useRef, useState } from "react";
import { CASE_NUMBER, MAKER } from "@/lib/config";
import { savePassImage } from "@/lib/save-pass";
import { formatVisit } from "@/lib/when";
import { BackNav } from "@/components/BackNav";
import { Seal } from "@/components/Seal";
import { Stamp } from "@/components/Stamp";
import { Confetti } from "@/components/Confetti";
import { TextMeNotice } from "@/components/TextMeNotice";

type CertificateProps = {
  me: string;
  you: string;
  wantedCookies: boolean;
  visit: { date: string; time: string };
  onBack: () => void;
  onFirstPage: () => void;
};

export function Certificate({
  me,
  you,
  wantedCookies,
  visit,
  onBack,
  onFirstPage,
}: CertificateProps) {
  const when = formatVisit(visit.date, visit.time);
  const textMessage = `I'm coming ${when}`;
  const issued = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
  const passRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [saveNote, setSaveNote] = useState("");

  async function savePass() {
    if (!passRef.current || saving) {
      return;
    }
    setSaving(true);
    setSaveNote("");
    try {
      const result = await savePassImage(passRef.current);
      setSaveNote(
        result === "shared"
          ? "Saved. Flash that at the door like a very official snack ID."
          : "Downloaded. Show it when you arrive. The laptop will squint at it.",
      );
    } catch {
      setSaveNote(
        "The Bureau printer jammed. Screenshot the pass the old-fashioned way.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="relative">
      <Confetti />
      <BackNav
        onBack={onBack}
        backLabel="I missed a bit. Walk me back."
        onFirstPage={onFirstPage}
        firstPageLabel="I wasn't listening. Take me to page one."
      />
      <TextMeNotice me={me} message={textMessage} />
      <div ref={passRef} className="certificate">
        <div className="flex items-start justify-between gap-3">
          <Seal size={64} />
          <div className="text-right">
            <Stamp tone="gold">SHOW THIS</Stamp>
            <p className="mt-2 font-mono text-[10px] text-[#8a6d2a]">
              {CASE_NUMBER}
            </p>
          </div>
        </div>

        <p className="mt-5 text-center font-mono text-[10px] tracking-[0.35em] text-[#8a6d2a] uppercase">
          Department of Going Out
        </p>
        <h2 className="mt-2 text-center font-serif text-3xl text-[#1b2a4a] sm:text-4xl">
          Fancy Visitor Pass — Ivy
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#b42318]">
          Present upon arrival. The laptop does not accept excuses. Ivy neither.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-[#5c4a3a]">
          This certifies that{" "}
          <span className="italic text-[#1b2a4a]">{you}</span> — known
          affectionately as Poison Ivy — may enter{" "}
          <span className="italic text-[#1b2a4a]">{me}</span>’s place, steal the
          good pillow, pick the movie, and pretend this was a normal invite.
          Theater: the bed. Screen: the laptop. Toxicity: zero. Charm: maximum.
          Plot twist. Ta-da.
        </p>

        <p className="mx-auto mt-5 max-w-lg border-2 border-[#1b2a4a] bg-[#efe6d4] px-4 py-3 text-center">
          <span className="kicker">Show up</span>
          <span className="mt-1 block font-serif text-xl text-[#1b2a4a]">
            {when}
          </span>
        </p>

        <dl className="mx-auto mt-6 grid max-w-lg gap-3 border-y border-dashed border-[#c9b8a0] py-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-[#8a6d2a] uppercase">
              Issued
            </dt>
            <dd className="text-[#1b2a4a]">{issued}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-[#8a6d2a] uppercase">
              Destination
            </dt>
            <dd className="text-[#1b2a4a]">My place — pin on request</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-[#8a6d2a] uppercase">
              Includes
            </dt>
            <dd className="text-[#1b2a4a]">
              {wantedCookies
                ? "Snacks, a laptop movie, and the cookies you personally rescued"
                : "Snacks, a laptop movie, and cookies I will still try to share"}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-[#8a6d2a] uppercase">
              Exit
            </dt>
            <dd className="text-[#1b2a4a]">
              Whenever. The door is not a puzzle. No vines blocking the exit.
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <div className="font-serif text-xl italic text-[#1b2a4a]">
              The Bureau (lol)
            </div>
            <p className="font-mono text-[10px] text-[#8a6d2a] uppercase">
              Host / snack deputy ({me})
            </p>
            <p className="mt-1 font-mono text-[10px] text-[#1b2a4a]">
              Made by {MAKER}
            </p>
          </div>
          <Stamp>KNOCK KNOCK</Stamp>
        </div>
      </div>

      <div className="mt-4 print:hidden">
        <button
          type="button"
          onClick={savePass}
          disabled={saving}
          className="official-btn official-btn-primary w-full sm:w-auto"
        >
          {saving ? "Printing the pass…" : "Save the pass — show this at the door"}
        </button>
        {saveNote ? (
          <p className="mt-3 font-mono text-[12px] text-[#1b2a4a]">{saveNote}</p>
        ) : (
          <p className="mt-3 text-sm text-[#5c4a3a]">
            This saves a picture of the certificate, not a spreadsheet. A CSV
            of “us hanging out” would be extremely unromantic. Ivy deserves
            better stationery. The laptop agrees.
          </p>
        )}
      </div>
    </section>
  );
}
