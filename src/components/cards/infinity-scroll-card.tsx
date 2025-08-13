"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewsArticle } from "@/interface/all-interfaces";
import { fetcNews } from "@/lib/fetchNews";
import { CircularProgress } from "@mui/material";
import LatestNewsCard from "./latest-news-card";
import { getSingleNews } from "@/lib/getSingleNews";
import { distname } from "@/lib/navbar-items";
import { Heading } from "../Heading";
interface pageprops{
    initialData: NewsArticle[]
    districtName:string
}
export default function InfiniteCard(props:pageprops) {
    const {initialData,districtName} = props
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(initialData);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
    const dist = distname(districtName)

      // Show "No news found" if no articles
      if (!newsArticles) {
        return (
          <div className="container mx-auto  bg-white dark:bg-black text-black dark:text-white">
            <Heading text={"తాజా వార్తలు"} />
    
            <p>No news found</p>
          </div>
        );
      }

  const fetchNews = async () => {
    try {
      const data = await getSingleNews({ newsId:districtName, content: false, page: page });

      if (data && data.length > 0) {
        // Append new page data
        setNewsArticles((prev) => [...prev, ...data]);
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
    {newsArticles && newsArticles.length > 0 ? (
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
        <LatestNewsCard newsArticles={newsArticles} heading={`${dist} వార్తలు`}/>
      </InfiniteScroll>
    ) : (
      <div className="flex justify-center items-center py-6">
        <CircularProgress size={50} thickness={4} sx={{ color: "#1976d2" }} />
      </div>
    )}
  </>
  );
}
