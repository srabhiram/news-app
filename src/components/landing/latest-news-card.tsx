"use client";
import { NewsArticle } from "@/redux/features/news/news-slice";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface LatestNewsCardProps {
  newsArticles: NewsArticle[];
  loading?: boolean;
}

export default function LatestNewsCard({
  newsArticles
}: LatestNewsCardProps) {
  // Memoize formatted dates to prevent recalculation on re-renders
  const formattedDates = newsArticles.map((article) =>
    formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })
  );
//  // Show loading skeleton if loading
//  if (loading) {
//   return (
//     <div className="container mx-auto px-4 dark:bg-black dark:text-white">
//       <h1 className="text-2xl md:text-3xl font-PottiSreeramulu font-bold mt-6 ml-2 mb-4">
//         తాజా వార్తలు
//       </h1>
//       <NewsCardSkeleton />
//     </div>
//   );
// }

// // Show "No news found" if not loading and no articles
// if (newsArticles.length===0 && !loading) {
//   return (
//     <div className="container mx-auto px-4 dark:bg-black dark:text-white">
//       <h1 className="text-2xl md:text-3xl font-PottiSreeramulu font-bold mt-6 ml-2 mb-4">
//         తాజా వార్తలు
//       </h1>
//       <p>No news found</p>
//     </div>
//   );
// }

  return (
    <div className="container mx-auto px-4 dark:bg-black dark:text-white">
      <h1 className="text-2xl md:text-3xl font-PottiSreeramulu font-bold mt-6 ml-2 mb-4">
        తాజా వార్తలు
      </h1>
      <div className="mb-4 rounded-lg">
        {
          newsArticles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsArticles?.map((article, index) => (
                <Link
                  key={article._id}
                  href={`/news/${article._id}`}
                  className="flex flex-row sm:flex-row items-center hover:bg-gray-50 p-2 rounded max-sm:border-b"
                  aria-label={`Read more about ${article.newsTitle}`}
                >
                  {article.image && (
                    <div className="flex-shrink-0 mr-2 w-1/3 sm:w-1/4 sm:mr-4">
                      <Image
                        src={article.image}
                        alt={article.newsTitle}
                        width={200}
                        height={200}
                        priority
                        className="rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-sm sm:text-lg lg:text-xl font-bold line-clamp-2 hover:underline">
                      {article.newsTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      • <span>{formattedDates[index]}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
}
