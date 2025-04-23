import LatestNewsCard from "@/components/news-card/latest-news-card";
import LoadingSvg from "@/components/svg/loadingSVG";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<LoadingSvg />}>
      <LatestNewsCard />
    </Suspense>
  );
}
