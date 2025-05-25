import { useFormattedDates } from '@/hooks/useFormatdatetime';
import { isNewPost } from '@/lib/isNewPost';
import { distname } from '@/lib/navbar-items';
import { NewsArticle } from '@/redux/features/news/news-slice';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Heading } from '../Heading';

export const LatestNewsLanding = ({ newsArticles }: { newsArticles: NewsArticle[] }) => {
  const slicedArticles = newsArticles.slice(0, 4);
  const formattedDates = useFormattedDates(newsArticles);

  return (
    <section className="w-full max-w-3xl mx-auto px-3 sm:px-4 py-2">
           <Heading text={"తాజా వార్తలు"}/>
<div className='rounded-md bg-white dark:bg-zinc-800 mb-1'>

      {slicedArticles &&
        slicedArticles.map((article, index) => (
          <Link
            key={article._id}
            href={`/news/${article._id}`}
            className={cn(
              "flex flex-row items-center   p-2 ",
              index !== slicedArticles.length - 1 && "max-sm:border-b-2 border-zinc-200 dark:border-zinc-700",
              "hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-200"
            )}
            aria-label={`Read more about ${article.newsTitle}`}
          >
            {/* Image Container */}
            <div className="relative flex-shrink-0 w-1/3 mr-3">
              <Image
                src={article.image}
                alt={article.newsTitle}
                width={400}
                height={100}
                className="rounded-md object-cover aspect-video w-full"
                priority={index === 0}
              />
              {isNewPost(article.createdAt, 6) && (
                <span className="absolute -top-3 -left-1.5">
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5">
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
                <b>{distname(article.district)}</b> • <span>{formattedDates?.[index] || ""}</span>
              </p>
            </div>
          </Link>
        ))}
        </div>
      <Link href={"/latest-news"} className='flex justify-end text-sm text-blue-500 font-bold hover:text-blue-700 active:text-blue-700 hover:underline'>మరి కొన్ని వార్తలు</Link>
    </section>
  );
};