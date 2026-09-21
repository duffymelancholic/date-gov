"use client";

import { useState } from "react";
import { denyNotices } from "@/lib/copy";
import { BackNav } from "@/components/BackNav";
import { Stamp } from "@/components/Stamp";

type RulingProps = {
  you: string;
  me: string;
  onApprove: () => void;
  onBack: () => void;
};

export function Ruling({ you, me, onApprove, onBack }: RulingProps) {
  const [denies, setDenies] = useState(0);
  const [noticeIndex, setNoticeIndex] = useState<number | null>(null);

  const exhausted = denies >= denyNotices.length;
  const activeNotice =
    noticeIndex === null ? null : denyNotices[noticeIndex];

  function deny() {
    if (exhausted) {
      onApprove();
      return;
    }
    setNoticeIndex(denies);
    setDenies((count) => count + 1);
  }

  return (
    <section className="paper-card relative overflow-hidden">
      <BackNav
        onBack={onBack}
        backLabel="Wait. I skimmed. Take me back."
      />
      <p className="kicker">The bit where I ask</p>
      <h2 className="display-title">So… come over?</h2>
      <p className="lede">
        {you}, {me} has snacks, a laptop, a bed that doubles as every chair,
        and a very normal amount of nerves. If you say yes I will pretend I
        did not build a government for this. If you say no the laptop will
        dim itself in protest. It’s dramatic. It’s a machine.
      </p>

      <p className="mt-6 text-center font-serif text-3xl leading-tight text-[#1b2a4a] sm:text-4xl">
        Come over tonight?
      </p>
      <p className="mt-2 text-center font-mono text-[11px] text-[#8a6d2a]">
        Yes gets you a visitor pass. Stay Home gets a very silly memo.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onApprove}
          className="official-btn official-btn-primary min-w-[180px]"
        >
          I’m coming over
        </button>
        <button
          type="button"
          onClick={deny}
          className="official-btn official-btn-danger min-w-[180px]"
        >
          {exhausted ? "Okay, the laptop won" : "I’ll stay home"}
        </button>
      </div>

      {denies > 0 && !exhausted ? (
        <p className="mt-4 text-center font-mono text-[11px] text-[#5c4a3a]">
          Low-battery protests logged: {denies}. The pillows are taking notes.
        </p>
      ) : null}

      {activeNotice ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#1b2a4a]/45 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="deny-title"
        >
          <div className="w-full max-w-lg border-4 border-[#1b2a4a] bg-[#f4efe4] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#8a6d2a] uppercase">
                Memo {activeNotice.code}
              </p>
              <Stamp>{activeNotice.stamp}</Stamp>
            </div>
            <h3
              id="deny-title"
              className="mt-3 font-serif text-2xl text-[#1b2a4a]"
            >
              {activeNotice.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5c4a3a]">
              {activeNotice.body}
            </p>
            <button
              type="button"
              onClick={() => setNoticeIndex(null)}
              className="official-btn official-btn-primary mt-5"
            >
              Back to the silly question
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
