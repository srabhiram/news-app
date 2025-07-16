"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { NewsArticle } from "@/interface/all-interfaces";
import Image from "next/image";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

export default function CarouselWithPagination({ newsArticles }: { newsArticles: NewsArticle[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const slicedArticles = newsArticles.slice(0, 5);

  // Set up carousel state and event listeners
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Autoplay logic
  React.useEffect(() => {
    if (!api || isPaused) {
      return;
    }

    const autoplayInterval = setInterval(() => {
      const nextIndex = (api.selectedScrollSnap() + 1) % count;
      api.scrollTo(nextIndex);
    }, 15000); // Advance every 10 seconds

    return () => clearInterval(autoplayInterval); // Cleanup on unmount or pause
  }, [api, isPaused, count]);

  // Pause autoplay on user interaction
  const handleUserInteraction = () => {
    setIsPaused(true);
    // Resume autoplay after 5 seconds of inactivity
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto  sm:px-6 lg:px-8">
      <Carousel setApi={setApi} className="w-full bg-zinc-800 rounded-sm overflow-hidden">
        <CarouselContent>
          {slicedArticles &&
            slicedArticles.map((article, index) => (
              <CarouselItem key={article._id}>
                <Link href={`/news/${article._id}`} className="relative w-full aspect-video flex items-center justify-center">
                  <CldImage
                  preserveTransformations
                    src={article.image}
                    alt={article.newsTitle}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <p className="text-white text-sm sm:text-base md:text-lg font-semibold line-clamp-2">
                      {article.newsTitle}
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious
          className="hidden"
        />
        <CarouselNext
          className="hidden"
        />
      </Carousel>
      <div className="mt-4 flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              api?.scrollTo(index);
              handleUserInteraction();
            }}
            className={cn(
              "h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all duration-200",
              current === index + 1
                ? "bg-primary scale-125"
                : "bg-zinc-500/50 hover:bg-zinc-500"
            )}
          />
        ))}
      </div>
    </div>
  );
}