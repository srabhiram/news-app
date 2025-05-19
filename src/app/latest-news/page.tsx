import LatestNewsCard from "@/components/cards/latest-news-card";
import { fetcNews } from "@/lib/fetchNews";
import React from "react";

export default async function LatestNewsPage() {
  const { newsArticles } = await fetcNews("no-store");

  return (
    <div>
      <LatestNewsCard newsArticles={newsArticles} />
    </div>
  );
}
