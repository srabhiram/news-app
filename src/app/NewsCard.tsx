"use client";
import LatestNewsCard from "@/components/cards/latest-news-card";
import Pagination from "@/components/Pagination";
import { useGetNews } from "@/hooks/UsegetNews";
import { NewsArticle } from "@/redux/features/news/news-slice";
import { useState } from "react";

export default function NewsCard({
  newsArticles,
}: {
  newsArticles: NewsArticle[];
}) {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  const totalPages = Math.ceil(newsArticles.length / itemsPerPage);
  const paginatedNews = newsArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      {" "}
      <LatestNewsCard newsArticles={paginatedNews} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
