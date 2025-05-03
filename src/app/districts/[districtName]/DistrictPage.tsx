"use client";
import LatestNewsCard from "@/components/landing/latest-news-card";
import { useGetNewsByParams } from "@/hooks/UsegetNewsByParams";
import React from "react";


export default function DistrictPageClient({
  params,
}: {
  params: Promise<{ districtName: string }>;
}) {
  const { districtName } = React.use(params);
 const {loading, newsArticles} = useGetNewsByParams(districtName)
  return (
    <LatestNewsCard newsArticles={newsArticles} loading={loading} /> // Placeholder for news articles, replace with actual data from Redux store
  );
}
