import LatestNewsCard from "@/components/cards/latest-news-card";
import { CarouselLading } from "@/components/landing/carousel-landing";
import { LatestNewsLanding } from "@/components/landing/latest-news-landing";
import { fetcNews } from "@/lib/fetchNews";

export default async function Home() {
  const { newsArticles } = await fetcNews("no-store");
  return (
    <>
    <main className="m-0.5">
      <div className="grid md:grid-cols-3 gap-1 ">
        <div className="md:col-span-2"><CarouselLading newsArticles={newsArticles}/></div>
        <div><LatestNewsLanding newsArticles= {newsArticles}/></div>

      </div>
    </main>
    </>
  );
}
