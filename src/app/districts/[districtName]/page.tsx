"use client";
import LatestNewsCard from "@/components/news-card/latest-news-card";
import { getNewsByParam } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DistrictPage({
  params,
}: {
  params: Promise<{ districtName: string }>;
}) {
  const { districtName } = React.use(params);
  const { newsArticles, success, loading } = useSelector((state: RootState) => state.news);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getNewsByParam(districtName));
  }, [dispatch, districtName, success]);
  return (
    <LatestNewsCard newsArticles={newsArticles} success={success} loading={loading} /> // Placeholder for news articles, replace with actual data from Redux store
  );
}
