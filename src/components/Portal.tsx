"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Certificate } from "@/components/Certificate";
import {
  OfficialBanner,
  SiteFooter,
  SiteHeader,
  WarningTape,
} from "@/components/Chrome";
import { CookieBanner } from "@/components/CookieBanner";
import { Landing } from "@/components/Landing";
import { Ruling } from "@/components/Ruling";
import { Schedule } from "@/components/Schedule";
import { DEFAULT_ME, DEFAULT_YOU, readName } from "@/lib/config";

type Stage = "landing" | "ruling" | "schedule" | "certificate";

export function Portal() {
  const params = useSearchParams();
  const me = readName(params.get("me"), DEFAULT_ME);
  const you = readName(params.get("you"), DEFAULT_YOU);

  const [stage, setStage] = useState<Stage>("landing");
  const [showCookies, setShowCookies] = useState(true);
  const [wantedCookies, setWantedCookies] = useState(true);
  const [visit, setVisit] = useState({ date: "", time: "" });
  const [returnedToStart, setReturnedToStart] = useState(false);

  function goToLanding() {
    setReturnedToStart(true);
    setStage("landing");
  }

  return (
    <div
      className={`flex min-h-dvh flex-1 flex-col ${
        showCookies && stage === "landing" ? "pb-36 sm:pb-28" : ""
      }`}
    >
      <OfficialBanner />
      <WarningTape />
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:py-10">
        {stage === "landing" ? (
          <Landing
            you={you}
            me={me}
            returning={returnedToStart}
            onBegin={() => setStage("ruling")}
          />
        ) : null}
        {stage === "ruling" ? (
          <Ruling
            you={you}
            me={me}
            onApprove={() => setStage("schedule")}
            onBack={goToLanding}
          />
        ) : null}
        {stage === "schedule" ? (
          <Schedule
            you={you}
            initialDate={visit.date}
            initialTime={visit.time}
            onConfirm={(next) => {
              setVisit(next);
              setStage("certificate");
            }}
            onBack={() => setStage("ruling")}
            onFirstPage={goToLanding}
          />
        ) : null}
        {stage === "certificate" ? (
          <Certificate
            me={me}
            you={you}
            wantedCookies={wantedCookies}
            visit={visit}
            onBack={() => setStage("schedule")}
            onFirstPage={goToLanding}
          />
        ) : null}
      </main>

      <SiteFooter />

      {showCookies && stage === "landing" ? (
        <CookieBanner
          onAccept={(dessert) => {
            setWantedCookies(dessert);
            setShowCookies(false);
          }}
        />
      ) : null}
    </div>
  );
}

export function OfficialLoading() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <OfficialBanner />
      <WarningTape />
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <section className="paper-card">
          <p className="kicker">One sec</p>
          <h2 className="display-title">Charging the laptop…</h2>
          <p className="lede">This is a real errand. The pillows have notes.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
