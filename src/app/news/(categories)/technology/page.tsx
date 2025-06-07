import LatestNewsCard from "@/components/cards/latest-news-card";
import { NewsArticle } from "@/interface/all-interfaces";
import { getSingleNews } from "@/lib/getSingleNews";
import React from "react";

export default async function page() {
  const newsArticles:NewsArticle[] = await getSingleNews("technology")
  return <LatestNewsCard newsArticles={newsArticles} categoryType="technology" heading="టెక్నాలజీ"/>
}
