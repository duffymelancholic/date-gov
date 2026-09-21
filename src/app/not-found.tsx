import Link from "next/link";
import {
  OfficialBanner,
  SiteFooter,
  SiteHeader,
  WarningTape,
} from "@/components/Chrome";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <OfficialBanner />
      <WarningTape />
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <section className="paper-card">
          <p className="kicker">Error 404</p>
          <h2 className="display-title">This page wandered off.</h2>
          <p className="lede">
            You did not. You’re still invited. Come back to the door before the
            snacks start a slideshow.
          </p>
          <Link
            href="/"
            className="official-btn official-btn-primary mt-6 inline-flex"
          >
            Return to the Bureau
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
