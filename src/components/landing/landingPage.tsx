"use client";
import { getNews } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
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
                <h2 className="text-xl font-bold">{article.newsTtile}</h2>
                <p className="text-gray-700">{article.description}</p>
                <p className="text-sm text-gray-500">
                  Published on:{" "}
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default LandingPage;
