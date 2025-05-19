import LatestNewsCard from "@/components/cards/latest-news-card";
import { getSingleNews } from "@/lib/getSingleNews";
import { NewsArticle } from "@/redux/features/news/news-slice";
import React from "react";

export default async function DistrictPageClient({
  params,
}: {
  params: Promise<{ districtName: string }>;
}) {
  const param = await params;
  const newsArticles: NewsArticle[] = await getSingleNews(param.districtName);
  return (
    <LatestNewsCard newsArticles={newsArticles} /> // Placeholder for news articles, replace with actual data from Redux store
  );
}
