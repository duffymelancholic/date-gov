import { Suspense } from "react";
import { OfficialLoading, Portal } from "@/components/Portal";

export default function Home() {
  return (
    <Suspense fallback={<OfficialLoading />}>
      <Portal />
    </Suspense>
  );
}
