type LandingProps = {
  you: string;
  me: string;
  returning?: boolean;
  onBegin: () => void;
};

export function Landing({ you, me, returning = false, onBegin }: LandingProps) {
  return (
    <section className="paper-card">
      <p className="kicker">
        {returning ? "Welcome back, skimmer" : "Extremely official goof"}
      </p>
      {returning ? (
        <p className="mb-2 font-mono text-[12px] text-[#b42318]">
          You came back. The plants noticed. No judgment. Well, a little
          judgment. Here’s the first page again, slower this time.
        </p>
      ) : null}
      <h2 className="display-title">You’ve been summoned to laptop cinema.</h2>
      <p className="lede">
        Citizen <span className="italic">{you}</span>, the Bureau looked at
        “going out,” then looked at {me}’s place, then remembered the theater
        is a bed and the screen is a laptop. Pants may have an opinion.
        Lighting is “whatever the lamp is doing.” The snacks have been
        briefed.
      </p>

      <dl className="mt-6 grid gap-3 border-y border-dashed border-[#c9b8a0] py-4 font-mono text-[12px] text-[#1b2a4a] sm:grid-cols-2">
        <div>
          <dt className="text-[#8a6d2a] uppercase tracking-widest">Venue</dt>
          <dd className="mt-0.5 text-sm">My place. Bed seats. Laptop screen.</dd>
        </div>
        <div>
          <dt className="text-[#8a6d2a] uppercase tracking-widest">Agenda</dt>
          <dd className="mt-0.5 text-sm">Snacks. A movie. Unserious sitting.</dd>
        </div>
        <div>
          <dt className="text-[#8a6d2a] uppercase tracking-widest">Dress</dt>
          <dd className="mt-0.5 text-sm">Come-over casual. Socks encouraged.</dd>
        </div>
        <div>
          <dt className="text-[#8a6d2a] uppercase tracking-widest">Exit policy</dt>
          <dd className="mt-0.5 text-sm">Leave whenever. The door works. Wow.</dd>
        </div>
      </dl>

      <p className="mt-5 text-sm leading-relaxed text-[#5c4a3a]">
        I cleaned the visible bits. I told the plants we might have company.
        One of them nodded, I think. All that’s missing is you, walking in like
        you own the trackpad.
      </p>

      <button
        type="button"
        onClick={onBegin}
        className="official-btn official-btn-primary mt-6 w-full sm:w-auto"
      >
        {returning ? "Okay I actually read it this time" : "Okay, I’m listening"}
      </button>
    </section>
  );
}
