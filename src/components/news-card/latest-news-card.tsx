"use client";
import Image from "next/image";
import { NewsArticle } from "@/redux/features/news/news-slice";
import Link from "next/link";
import NewsCardSkeleton from "../skeletons/news-card";
import { formatDistanceToNow } from "date-fns"; // Import date-fns

export default function LatestNewsCard({
  newsArticles,
  loading,
}: {
  newsArticles: NewsArticle[];
  success: boolean;
  loading: boolean;
}) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl md:text-3xl font-PottiSreeramulu font-bold mt-6 ml-2 mb-4">
        తాజా వార్తలు
      </h1>
      <div className="border p-2 mx-1 mb-4 rounded-lg shadow-md">
        {loading ? (
          <NewsCardSkeleton />
        ) : newsArticles.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsArticles?.map((article) => (
              <div
                key={article?._id}
                className="flex flex-col sm:flex-row items-start sm:items-center mb-4 hover:bg-gray-50 p-2 rounded"
              >
                {article?.image && (
                  <Link href={`news/${article?._id}`} className="flex-shrink-0">
                    <Image
                      src={article?.image}
                      alt={article?.newsTitle}
                      width={150}
                      height={100}
                      unoptimized
                      className="rounded w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-cover mr-0 sm:mr-4 mb-2 sm:mb-0"
                    />
                  </Link>
                )}
                <div className="flex-1">
                  <Link
                    href={`/news/${article?._id}`}
                    className="hover:underline"
                  >
                    <h2 className="text-sm sm:text-lg lg:text-xl font-bold line-clamp-2">
                      {article?.newsTitle}
                    </h2>
                  </Link>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    •{" "}
                    <span>
                      {formatDistanceToNow(new Date(article?.createdAt), {
                        addSuffix: true, // Adds "ago"
                      })}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center py-4">
            No news articles available.
          </p>
        )}
      </div>
    </div>
  );
}