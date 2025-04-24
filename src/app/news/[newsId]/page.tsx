"use client";
import SingleNewsCardSkeleton from "@/components/skeletons/single-news-card";
import { getNewsByParam } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NewsIdPage({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = React.use(params);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getNewsByParam(newsId));
  }, [dispatch, newsId]);
  const { newsArticles, loading } = useSelector(
    (state: RootState) => state.news
  );
  if (loading) {
    return <SingleNewsCardSkeleton />;
  }
  return (
    <div>
      {newsArticles.length === 0 ? (
        <p className="text-gray-500 italic">No news articles available.</p>
      ) : (
        newsArticles.map((article) => (
          <div key={article._id} className="flex flex-col items-center mx-0.5 ">
            <Image
              src={article.image}
              alt={article.newsTitle}
              width={50}
              height={50}
              className="rounded-md w-80 h-60 my-1 object-contain  "
            />
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                {article.newsTitle}
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                <span className="capitalize font-bold">{article.author}</span>•{" "}
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1 tracking-wider leading-6 ">
                {article.content}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
