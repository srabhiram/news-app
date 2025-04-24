"use client";
import LatestNewsCard from "@/components/news-card/latest-news-card";
import LoadingSvg from "@/components/svg/loadingSVG";
import { getNews } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { newsArticles, success, loading } = useSelector(
    (state: RootState) => state.news
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch, success]);
  return (
    <Suspense fallback={<LoadingSvg />}>
      <LatestNewsCard
        newsArticles={newsArticles}
        success={success}
        loading={loading}
      />
    </Suspense>
  );
}
