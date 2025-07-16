"use client"

import React from "react";
import { Heading } from "../Heading";
import { NewsArticle } from "@/interface/all-interfaces";
import Link from "next/link";
import Image from "next/image";
import { isNewPost } from "@/lib/isNewPost";
import { Badge } from "../ui/badge";
import { categoryNames } from "@/lib/navbar-items";
import { useFormattedDates } from "@/hooks/useFormatdatetime";
import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";

export const SportsLanding = ({
  newsArticles,
}: {
  newsArticles: NewsArticle[];
}) => {
  const filteredArticles = newsArticles.filter(
    (articles) => articles.category === "sports"
  );
  const formattedDates = useFormattedDates(filteredArticles);
  return (
    <section className=" py-1.5" id="sports">
      {newsArticles ? (
        <>
          <Heading text={"స్పోర్ట్స్"} />
          <div className="block md:grid md:grid-cols-2 bg-white dark:bg-zinc-800 rounded-md">
            {filteredArticles.map((article, index) => (
              <Link
                key={article._id}
                href={`/news/${article._id}`}
                className={cn(
                  "flex flex-row items-center   p-2 rounded-md",
                  index !== filteredArticles.length - 1 &&
                    "max-sm:border-b-2 md:border-r-2 border-zinc-200 dark:border-zinc-700",
                  "hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-200"
                )}
                aria-label={`Read more about ${article.newsTitle}`}
              >
                {/* Image Container */}
                <div className="relative flex-shrink-0 w-1/3 mr-3">
                  <CldImage
                  preserveTransformations
                    src={article.image}
                    alt={article.newsTitle}
                    width={400}
                    height={100}
                    className="rounded-md object-cover aspect-video w-full"
                    priority={index === 0}
                  />
                  {isNewPost(article.createdAt, 6) && (
                    <span className="absolute -top-3 -left-1.5">
                      <Badge
                        variant="destructive"
                        className="text-[10px] px-1.5 py-0.5"
                      >
                        New
                      </Badge>
                    </span>
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h2 className="text-sm font-PottiSreeramulu font-bold line-clamp-2 hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    {article.newsTitle}
                  </h2>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 font-PottiSreeramulu">
                    <b>{categoryNames(article.category)}</b> •{" "}
                    <span>{formattedDates?.[index] || ""}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
};
