"use client"
import { NewsArticle } from '@/interface/all-interfaces'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { Heading } from '../Heading'
import { TrendingNewsSkeleton } from '../skeletons/trending -news-skeleton'
import { distname } from '@/lib/navbar-items'
import { CldImage } from 'next-cloudinary'
import { isNewPost } from '@/lib/isNewPost'
import { Badge } from '../ui/badge'
import { useFormattedDates } from '@/hooks/useFormatdatetime'
import { cn } from '@/lib/utils'
interface pageprops{
    data?:NewsArticle[]
}
export default function TredningNewsLanding({ data }: pageprops) {

    const trending_news = [...(data ?? [])]
        .sort((a, b) => b.views! - a.views!)
        .slice(0, 10);
          const formattedDates = useFormattedDates(trending_news);
        
  return (
   <section className="mb-1">
        <Heading text="ట్రేండింగ్ న్యూస్ " />
        <Suspense fallback={<TrendingNewsSkeleton />}>
          <div
            className=" max-w-full
    flex md:flex-row flex-col md:flex-wrap md:gap-2
"
          >
            {data &&
              trending_news
                .sort((a, b) => b.views! - a.views!)
                .slice(0, 10)
                .map((article, index) => (
               <Link
              key={article._id}
              href={`/news/${article._id}`}
              className={cn(
                "flex flex-row items-center   p-2 ",
                index !== trending_news.length - 1 &&
                  "max-sm:border-b-2 border-zinc-200 dark:border-zinc-700",
                "hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-200"
              )}
              aria-label={`Read more about ${article.newsTitle}`}
            >
              {/* Image Container */}
              <div className="relative flex-shrink-0 w-1/3 mr-3">
                <CldImage
                  src={article.image}
                  alt={article.newsTitle}
                  preserveTransformations={true}
                  width={250}
                  height={100}
                  className="aspect-video object-cover object-top w-[150px] md:w-[250px] rounded"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
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
                <h2 className="text-sm font-telugu font-bold line-clamp-2 hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  {article.newsTitle}
                </h2>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 font-telugu">
                  <b>{distname(article.district)}</b> •{" "}
                  <span>{formattedDates?.[index] || ""}</span>
                </p>
              </div>
            </Link>
                ))}
          </div>
        </Suspense>
      </section>
  )
}
