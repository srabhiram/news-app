"use client";
import SingleNewsCardSkeleton from "@/components/skeletons/single-news-card";
import { getNewsByParam } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaWhatsapp, FaLink, FaShareAlt } from "react-icons/fa";

export default function NewsIdPage({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = React.use(params);
  const dispatch = useDispatch<AppDispatch>();
  const [isShareOpen, setIsShareOpen] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    dispatch(getNewsByParam(newsId));
  }, [dispatch, newsId]);
  const { newsArticles, loading } = useSelector(
    (state: RootState) => state.news
  );

  const handleCopyLink = (articleId: string) => {
    const articleUrl = `${window.location.origin}/news/${articleId}`;
    navigator.clipboard.writeText(articleUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleWhatsAppShare = (article: { _id: string; newsTitle: string }) => {
    const articleUrl = `${window.location.origin}/news/${article._id}`;
    const message = `Check out this news article: ${article.newsTitle} - ${articleUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const toggleShareOptions = (articleId: string) => {
    setIsShareOpen((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }));
  };

  if (loading) {
    return <SingleNewsCardSkeleton />;
  }

  return (
    <div>
      {newsArticles.length === 0 ? (
        <p className="text-gray-500 italic">No news articles available.</p>
      ) : (
        newsArticles.map((article) => (
          <div key={article._id} className="flex flex-col items-center mx-0.5">
            <Image
              src={article.image}
              alt={article.newsTitle}
              width={50}
              height={50}
              className="rounded-md w-80 h-60 my-1 object-contain"
            />
            <div>
              {/* News Title and Share Icon Row */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold">
                  {article.newsTitle}
                </h2>
                <button
                  onClick={() => toggleShareOptions(article._id)}
                  className="p-2 text-gray-600 hover:text-gray-800"
                  title="Share"
                >
                  <FaShareAlt size={20} />
                </button>
              </div>
              {/* Share Options Dropdown */}
              {isShareOpen[article._id] && (
                <div className="absolute mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex gap-2 z-10">
                  <button
                    onClick={() => handleWhatsAppShare(article)}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp size={16} />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleCopyLink(article._id)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    title="Copy Link"
                  >
                    <FaLink size={16} />
                    Copy Link
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-600 mt-1">
                <span className="capitalize font-bold">{article.author}</span> •{" "}
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1 tracking-wider leading-6">
                {article.content}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}