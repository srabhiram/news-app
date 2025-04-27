"use client";
import LatestNewsCard from "@/components/news-card/latest-news-card";
import { getNews } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import {  useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NewsCard() {
    const { newsArticles, success, loading } = useSelector(
        (state: RootState) => state.news
      );
      const dispatch = useDispatch<AppDispatch>();
      const fetchNews = useCallback(() => {
          dispatch(getNews()).unwrap().catch((error) => {
            console.error("Error fetching news articles:", error);
          });
        }, [dispatch]);
      
        useEffect(() => {
          const abortController = new AbortController();
          fetchNews();
          return abortController.abort()
        }, [fetchNews,success]);
  return (
    <LatestNewsCard
    newsArticles={newsArticles}
    loading={loading}
  />
  )
}
