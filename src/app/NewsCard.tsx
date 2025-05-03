"use client";
import LatestNewsCard from "@/components/landing/latest-news-card";
import { useGetNews } from "@/hooks/UsegetNews";

export default function NewsCard() {
 const {loading,newsArticles} = useGetNews()
  return <LatestNewsCard newsArticles={newsArticles} loading={loading} />;
}
