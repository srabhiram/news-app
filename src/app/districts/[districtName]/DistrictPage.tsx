"use client";
import LatestNewsCard from "@/components/landing/latest-news-card";
import { getNewsByParam } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DistrictPageClient({
  params,
}: {
  params: Promise<{ districtName: string }>;
}) {
  const { districtName } = React.use(params);
  const { newsArticles, loading } = useSelector(
    (state: RootState) => state.news
  );

  const dispatch = useDispatch<AppDispatch>();
  const fetchNews = useCallback(
    (districtName: string) => {
      dispatch(getNewsByParam(districtName))
        .unwrap()
        .catch((error) => {
          console.error("Error fetching news articles:", error);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    const abortController = new AbortController(); // Create an AbortController instance
    fetchNews(districtName);
    return () => abortController.abort(); // Cancel fetch on unmount
  }, [fetchNews, districtName]);
  return (
    <LatestNewsCard newsArticles={newsArticles} loading={loading} /> // Placeholder for news articles, replace with actual data from Redux store
  );
}
