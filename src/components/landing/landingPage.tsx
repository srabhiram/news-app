"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { getNews } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { formatDistanceToNow } from "date-fns";

const fallbackImageUrl =
  "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM=";

const LandingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { newsArticles } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(getNews())
      .unwrap()
      .catch((error) => {
        console.error("Error fetching news articles:", error);
      });
  }, [dispatch]);

  return (
    <div className="p-4">
      <>
        <h1 className="text-2xl font-bold mb-6">Latest News</h1>
        {newsArticles.length && (
          newsArticles.map((article) => (
            <div
              key={article.id}
              className="border p-4 mb-4 rounded-lg shadow-md"
            >
              <Image
                src={article?.image || fallbackImageUrl}
                alt={article.newsTitle}
                width={200}
                height={100}
                unoptimized
                className="rounded"
              />
              <h2 className="text-xl font-bold mt-2">{article.newsTitle}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold capitalize">
                  {article.author}
                </span>{" "}
                •{" "}
                <span>
                  {formatDistanceToNow(new Date(article.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </p>
              <p className="text-gray-700 font-PottiSreeramulu">
                {article.content}
              </p>
            </div>
          ))
        )}
      </>
    </div>
  );
};

export default LandingPage;
