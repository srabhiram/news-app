import LatestNewsCard from "@/components/cards/latest-news-card";
import { CarouselLading } from "@/components/landing/carousel-landing";
import { LatestNewsLanding } from "@/components/landing/latest-news-landing";
import { SportsLanding } from "@/components/landing/sports-landing";
import { TechnologyLanding } from "@/components/landing/technology-landing";
import { fetcNews } from "@/lib/fetchNews";

export default async function Home() {
  const { newsArticles } = await fetcNews("no-store");
  return (
    <>
      <main className="m-0.5">
        <div className="grid md:grid-cols-3 gap-1 ">
          <div className="md:col-span-2">
            <div>
              <CarouselLading newsArticles={newsArticles} />
            </div>
            <div>
              <TechnologyLanding newsArticles={newsArticles}/>
              {/* <SportsLanding newsArticles={newsArticles}/> */}
            </div>
          </div>
          <div>
            <LatestNewsLanding newsArticles={newsArticles} />
          </div>
        </div>
      </main>
    </>
  );
}
