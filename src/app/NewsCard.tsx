"use client";
import LatestNewsCard from "@/components/news-card/latest-news-card";
import { getNews } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NewsCard() {
    const { newsArticles, success, loading } = useSelector(
        (state: RootState) => state.news
      );
      const dispatch = useDispatch<AppDispatch>();
      useEffect(() => {
        dispatch(getNews());
      }, [dispatch, success]);
  return (
    <LatestNewsCard
    newsArticles={newsArticles}
    success={success}
    loading={loading}
  />
  )
}
