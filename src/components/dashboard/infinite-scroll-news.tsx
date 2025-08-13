"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewsArticle } from "@/interface/all-interfaces";
import AllNewsShowcase from "./AllNewsShowcase";
import { fetcNews } from "@/lib/fetchNews";
import { CircularProgress } from "@mui/material";
interface pageprops{
    initialData: NewsArticle[]
}
export default function AllNewsInfinite(props:pageprops) {
    const {initialData} = props
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(initialData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async () => {
    try {
      const data = await fetcNews({ content: true, pageParams: page });

      if (data.newsArticles.length > 0) {
        // Append new page data
        setNewsArticles((prev) => [...prev, ...data.newsArticles]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
      <>
    {newsArticles.length > 0 ? (
      <InfiniteScroll
        dataLength={newsArticles.length}
        next={fetchNews}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center items-center py-6">
            <CircularProgress size={40} thickness={4} sx={{ color: "#1976d2" }} />
          </div>
        }
        endMessage={
          <p className="text-center py-4 text-gray-500">No more news</p>
        }
      >
        <AllNewsShowcase newsArticles={newsArticles} />
      </InfiniteScroll>
    ) : (
      <div className="flex justify-center items-center py-6">
        <CircularProgress size={50} thickness={4} sx={{ color: "#1976d2" }} />
      </div>
    )}
  </>
  );
}
