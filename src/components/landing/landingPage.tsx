"use client";
import { getNews } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LandingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, newsArticles } = useSelector(
    (state: RootState) => state.news
  );
  useEffect(() => {
    // Fetch news articles when the component mounts
    const fetchNews = async () => {
      try {
        // Dispatch an action to fetch news articles
        dispatch(getNews());
      } catch (error) {
        console.error("Error fetching news articles:", error);
      }
    };

    fetchNews();
  }, [dispatch]);
  console.log("newsArticles", newsArticles);
  return (
    <>
      <div>
        {loading ? (
          <p>Loading</p>
        ) : (
          <>
            {" "}
            <h1>Latest News</h1>
            {newsArticles.map((article) => (
              <div
                key={article.id}
                className="border p-4 mb-4 rounded-lg shadow-md"
              >
                <Image
                  src="https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                  alt={article.newsTitle}
                  width={200}
                  height={100}
                />
                <h2 className="text-xl font-bold">{article.newsTitle}</h2>
                <p>
                  <span className="opacity-55 font-semibold capitalize">{article.author}</span>{" "}
                 <span className="opacity-55"> {new Date(article.createdAt).toLocaleDateString()}</span>
                </p>
                <p className="text-gray-700 font-PottiSreeramulu">{article.description}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default LandingPage;
