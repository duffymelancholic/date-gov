"use client";

type CookieBannerProps = {
  onAccept: (wantDessert: boolean) => void;
};

export function CookieBanner({ onAccept }: CookieBannerProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 print:hidden">
      <div className="border-t-4 border-[#1b2a4a] bg-[#fffdf7] shadow-[0_-8px_30px_rgba(27,42,74,0.12)]">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-relaxed text-[#5c4a3a]">
            <span className="font-serif text-base text-[#1b2a4a]">
              We use cookies.
            </span>{" "}
            Also I have real cookies at my place for Ivy. They have been
            practicing a little wave. It’s embarrassing for everyone. Non-toxic.
            Promise.
          </p>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => onAccept(true)}
              className="official-btn official-btn-primary"
            >
              I’ll come wave back
            </button>
            <button
              type="button"
              onClick={() => onAccept(false)}
              className="official-btn official-btn-ghost"
            >
              Just the website ones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
