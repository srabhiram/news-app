"use client";
import Image from "next/image";
import { NewsArticle } from "@/redux/features/news/news-slice";
import Link from "next/link";

export default function LatestNewsCard({
  newsArticles, success
}: {
  newsArticles: NewsArticle[];
  success:  boolean;
}) {
  console.log(success)
  return (
    <div>
      <h1 className="text-2xl font-PottiSreeramulu font-bold mt-3 ml-2 mb-4">
        తాజా వార్తలు
      </h1>
      <div className="border p-1 mx-1 mb-1 rounded-lg shadow-md">
        {!success ? (
          <p className="text-gray-500 italic">No news articles available.</p>
        ) : (
          newsArticles?.map((article) => (
            <div key={article?._id} className="flex items-center mb-1 ">
              {article?.image && (
                <Link href={`news/${article?._id}`} className="flex-shrink-0">
                  <Image
                    src={article?.image}
                    alt={article?.newsTitle}
                    width={200}
                    height={100}
                    unoptimized
                    className="rounded w-28 h-28 object-contain mr-2 "
                  />
                </Link>
              )}
              <div>
                <Link href={`news/${article?._id}`} className="hover:underline">
                  {" "}
                  <h2 className="text-sm sm:text-xl font-bold">
                    {article?.newsTitle}
                  </h2>
                </Link>{" "}
                <p className="text-xs text-gray-600 mt-1">
                  •{" "}
                  <span>
                    {new Date(article?.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
