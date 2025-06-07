"use client";
import { NewsArticle } from "@/interface/all-interfaces";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { isNewPost } from "@/lib/isNewPost";
import { distname } from "@/lib/navbar-items";
import Pagination from "../Pagination";
import { useState } from "react";
import { useFormattedDates } from "@/hooks/useFormatdatetime";
import { Heading } from "../Heading";

interface LatestNewsCardProps {
  newsArticles: NewsArticle[];
  loading?: boolean;
  categoryType? : string,
  heading?: string
}

export default function LatestNewsCard({ newsArticles, categoryType,heading }: LatestNewsCardProps) {
 const formattedDates = useFormattedDates(newsArticles)
  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;

  const totalPages = ()=>{
    if(newsArticles){
   return  Math.ceil(newsArticles.length / itemsPerPage);
    }}
  const paginatedNews = newsArticles?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ).filter((articles)=>articles.district || articles.category===categoryType) ||  [];

  // Show "No news found" if no articles
  if (!newsArticles) {
    return (
      <div className="container mx-auto px-4 bg-white dark:bg-black text-black dark:text-white">
      <Heading text={"తాజా వార్తలు"}/>

        <p>No news found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto pb-4 bg-white dark:bg-zinc-900 text-black dark:text-white">
      {/* Section header */}
      <Heading text={heading || "తాజా వార్తలు"}/>
      <div className="mb-4">
        {paginatedNews && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedNews?.map((article, index) => (
              <Link
                key={article._id}
                href={`/news/${article._id}`}
                className="flex flex-col sm:flex-row items-start sm:items-center bg-white dark:bg-zinc-800 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 p-3"
                aria-label={`Read more about ${article.newsTitle}`}
              >
                {/* Image Container */}
                <div className="relative flex-shrink-0 w-full justify-center items-center sm:w-1/3 sm:mr-4 mb-2 sm:mb-0">
                  <Image
                    src={article.image}
                    alt={article.newsTitle}
                    width={400}
                    height={100}
                    style={{ height: "auto", width: "auto" }}
                    className="rounded-md object-cover object-top aspect-video w-full mx-auto"
                    priority
                  />
                  {isNewPost(article.createdAt, 6) && (
                    <span className="absolute -top-4 -left-2">
                      <Badge variant="destructive" className="text-[10px] w-7">
                        New
                      </Badge>
                    </span>
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h2 className="text-sm sm:text-base lg:text-lg font-PottiSreeramulu font-bold line-clamp-2 active:underline active:text-blue-600 hover:underline hover:text-blue-600 dark:hover:text-blue-400 sm:transition-colors sm:duration-300">
                    {article.newsTitle}
                  </h2>
                  <p className="py-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 font-PottiSreeramulu">
                    {" "}
                    <b>{distname(article.district)} </b>•{" "}
                    <span>{formattedDates?.[index] ?? ""}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages() ?? 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
