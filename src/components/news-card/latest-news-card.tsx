"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getNews } from "@/redux/features/news/news-slice";

export default function LatestNewsCard() {
  const {  newsArticles, success } = useSelector(
    (state: RootState) => state.news
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch, success]);
  
  return (
    <div>
      <h1 className="text-2xl font-PottiSreeramulu font-bold mt-1 mb-6">
        తాజా వార్తలు
      </h1>
      <div className="border p-4 mb-4 rounded-lg shadow-md">
        {newsArticles.length === 0 ? (
          <p className="text-gray-500 italic">No news articles available.</p>
        ) : (
          newsArticles.map((article) => (
            <div key={article?._id} className="mb-4">
              {article?.image && (
                <Image
                  src={article?.image}
                  alt={article?.newsTitle}
                  width={200}
                  height={100}
                  unoptimized
                  className="rounded"
                />
              )}
              <h2 className="text-xl font-bold mt-2">{article?.newsTitle}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold capitalize">
                  {article?.author}
                </span>{" "}
                •{" "}
                <span>{new Date(article?.createdAt).toLocaleDateString()}</span>
              </p>
              <p className="text-gray-700 font-PottiSreeramulu">
                {article?.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
