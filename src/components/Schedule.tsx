"use client";

import { useMemo, useState } from "react";
import { addDays, formatVisit, localISODate, nextSaturday } from "@/lib/when";

import { BackNav } from "@/components/BackNav";

type ScheduleProps = {
  you: string;
  initialDate?: string;
  initialTime?: string;
  onConfirm: (visit: { date: string; time: string }) => void;
  onBack: () => void;
  onFirstPage: () => void;
};

export function Schedule({
  you,
  initialDate,
  initialTime,
  onConfirm,
  onBack,
  onFirstPage,
}: ScheduleProps) {
  const today = localISODate();
  const presets = useMemo(() => {
    const now = new Date();
    const tonightStillOpen = now.getHours() < 21;
    const slots = [
      tonightStillOpen
        ? { label: "Tonight, 7:00 PM", date: localISODate(now), time: "19:00" }
        : {
            label: "Tomorrow, 7:00 PM",
            date: localISODate(addDays(now, 1)),
            time: "19:00",
          },
      {
        label: "Tomorrow, 8:00 PM",
        date: localISODate(addDays(now, 1)),
        time: "20:00",
      },
      {
        label: "Saturday, 6:00 PM",
        date: localISODate(nextSaturday(now)),
        time: "18:00",
      },
    ];
    return slots;
  }, []);

  const [date, setDate] = useState(initialDate || presets[0]?.date || today);
  const [time, setTime] = useState(initialTime || presets[0]?.time || "19:00");
  const [error, setError] = useState("");

  function confirm() {
    if (!date || !time) {
      setError(
        "The laptop needs both a day and a time. It’s needy like that. Even Poison Ivy has to pick a slot.",
      );
      return;
    }
    if (date < today) {
      setError(
        "That day already happened. The snacks cannot time-travel. The vines tried.",
      );
      return;
    }
    onConfirm({ date, time });
  }

  return (
    <section className="paper-card">
      <BackNav
        onBack={onBack}
        backLabel="Hold on, I blinked during the important part."
        onFirstPage={onFirstPage}
        firstPageLabel="I missed the first page. Start me at the summons."
      />
      <p className="kicker">Appointment desk</p>
      <h2 className="display-title">When should the laptop expect Ivy?</h2>
      <p className="lede">
        {you}, pick a day and a time. The Bureau will pencil Poison Ivy in,
        warn the snacks, charge the laptop, water nothing suspiciously leafy,
        and try very hard not to make the bed three times.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {presets.map((slot) => {
          const active = slot.date === date && slot.time === time;
          return (
            <button
              key={`${slot.date}-${slot.time}-${slot.label}`}
              type="button"
              onClick={() => {
                setDate(slot.date);
                setTime(slot.time);
                setError("");
              }}
              className={`official-btn ${
                active ? "official-btn-primary" : "official-btn-ghost"
              }`}
            >
              {slot.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="kicker">Date</span>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setError("");
            }}
            className="official-input mt-2"
          />
        </label>
        <label className="block">
          <span className="kicker">Time</span>
          <input
            type="time"
            value={time}
            onChange={(event) => {
              setTime(event.target.value);
              setError("");
            }}
            className="official-input mt-2"
          />
        </label>
      </div>

      <p className="mt-4 font-mono text-[12px] text-[#8a6d2a]">
        Current filing: {formatVisit(date, time)}
      </p>

      {error ? (
        <p className="mt-3 font-mono text-[12px] text-[#b42318]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={confirm}
        className="official-btn official-btn-primary mt-6 w-full sm:w-auto"
      >
        Lock it in
      </button>
    </section>
  );
}
