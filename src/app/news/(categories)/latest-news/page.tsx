import LatestNewsCard from "@/components/cards/latest-news-card";
import { fetcNews } from "@/lib/fetchNews";
import { Metadata } from "next";
import React from "react";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "తాజా వార్తలు - SRS News",
    description: "Latest News SRS News",
  };
}
export default async function LatestNewsPage() {
  const { newsArticles } = await fetcNews({});

  return (
    <div>
      <LatestNewsCard newsArticles={newsArticles} />
    </div>
  );
}
