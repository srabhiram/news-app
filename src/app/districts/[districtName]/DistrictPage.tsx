import LatestNewsCard from "@/components/cards/latest-news-card";
import { getSingleNews } from "@/lib/getSingleNews";
import { NewsArticle } from "@/interface/all-interfaces";
import React from "react";
import { distname } from "@/lib/navbar-items";

export default async function DistrictPageClient({
  params,
}: {
  params: Promise<{ districtName: string }>;
}) {
  const param = await params;
  const newsArticles: NewsArticle[] = await getSingleNews(param.districtName);
  const districtName = distname(param.districtName)
  return (
    <LatestNewsCard newsArticles={newsArticles} heading={`${districtName} వార్తలు`}/> // Placeholder for news articles, replace with actual data from Redux store
  );
}
