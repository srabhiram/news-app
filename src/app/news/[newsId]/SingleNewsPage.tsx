/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SingleNewsCardSkeleton from "@/components/skeletons/single-news-card";
import { getNewsByParam } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaWhatsapp, FaLink, FaShareAlt } from "react-icons/fa";
import { format, formatDistanceToNow } from "date-fns"; // Import date-fns
import { EyeIcon } from "lucide-react";

// Define interface for news article
interface NewsArticle {
  _id: string;
  newsTitle: string;
  image: string;
  createdAt: string;
  author: string;
  district?: string;
  content?: string;
}

export default function SingleNewsPage({ params }: { params: { newsId: string } }) {
  const { newsId } = params;
  const dispatch = useDispatch<AppDispatch>();
  const [isShareOpen, setIsShareOpen] = useState<{ [key: string]: boolean }>({});
  const [relatedPosts, setRelatedPosts] = useState<NewsArticle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [views, setViews] = useState<number>(0)
  useEffect(() => {
    dispatch(getNewsByParam(newsId));
  }, [dispatch, newsId]);

  const { newsArticles, loading } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        if (newsArticles.length > 0 && newsArticles[0]?.district) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/news/${newsArticles[0].district}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              cache: "no-store",
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          // Handle response structure
          let posts: NewsArticle[] = [];
          if (data.newsArticles && Array.isArray(data.newsArticles)) {
            posts = data.newsArticles;
          } else {
            throw new Error(
              `API response does not contain a valid newsArticles array. Received: ${JSON.stringify(data)}`
            );
          }

          // Filter out the main article by _id
          const filteredPosts = posts.filter((post) => post._id !== newsId);
          setRelatedPosts(filteredPosts);
          setError(null);
        }
      } catch (error: any) {
        console.error("Error fetching related posts:", error);
        setRelatedPosts([]);
        setError(error.message || "Failed to load related posts. Please try again later.");
      }
    };

    if (newsArticles.length > 0) {
      fetchRelatedPosts();
    }
  }, [newsArticles, newsId]);

  useEffect(()=>{
    const key = `viewed-news-${newsId}`

    // Check if user already viewed this news article
    if (localStorage.getItem(key)) return
  
    // First visit: call API to increment views
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/views/${newsId}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setViews(data.views)
        localStorage.setItem(key, 'true') // Mark as viewed
      })
  },[newsId])

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
    <div className="container mx-auto px-4 py-6">
      {newsArticles.length === 0 ? (
        <p className="text-gray-500 italic text-center">No news articles available.</p>
      ) : (
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Main Article (Left Side, 60% on Large Devices) */}
          <div className="w-full lg:w-3/5">
            {newsArticles.map((article) => (
              <div key={article._id} className="flex flex-col">
                {/* Main Image */}
                <Image
                  src={article.image || "/images/fallback.jpg"}
                  alt={article.newsTitle}
                  width={800}
                  height={400}
                  className="rounded-md w-full h-[200px] sm:h-[300px] lg:h-[450px] object-cover my-4"
                  priority
                />
                <div>
                  {/* News Title and Share Icon Row */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold font-PottiSreeramulu">
                      {article.newsTitle}
                    </h2>
                    
                  </div>
                 
                  {/* Author and Date */}
                  <div className="flex items-center justify-between mt-2 border-b">
                    <div className="flex items-center">
                    <p className="text-xs sm:text-sm text-gray-600 ">
                    <span className="capitalize font-bold">{article.author}</span> •{" "}
                    <span>
                      {format(new Date(article.createdAt), "dd MMM yyyy hh:mm a")}
                    </span>
                  </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <EyeIcon className="w-4 sm:w-5"/>
                      <span className="font-semibold">{article.views}</span>
                      <button
                      onClick={() => toggleShareOptions(article._id)}
                      className="p-2 text-gray-600 hover:text-gray-800"
                      title="Share"
                      aria-label="Share article"
                    >
                      <FaShareAlt  className="w-4 sm:w-5" />
                    </button>
                     {/* Share Options Dropdown */}
                  {isShareOpen[article._id] && (
                    <div className="relative">
                      <div className="absolute top-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex flex-col sm:flex-row gap-2 z-10">
                        <button
                          onClick={() => handleWhatsAppShare(article)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                          title="Share on WhatsApp"
                        >
                          <FaWhatsapp size={14} />
                          WhatsApp
                        </button>
                        <button
                          onClick={() => handleCopyLink(article._id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                          title="Copy Link"
                        >
                          <FaLink size={14} />
                          Copy Link
                        </button>
                      </div>
                    </div>
                  )}
                    </div>
                  </div>
                  {/* Content */}
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 mt-4 tracking-wide leading-7">
                    {article.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Related Posts (Right Side, 40% on Large Devices) */}
          <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
            <h3 className="text-xl sm:text-2xl font-bold font-PottiSreeramulu mb-6">
              సంబంధిత వార్తలు
            </h3>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : relatedPosts.length === 0 ? (
              <p className="text-gray-500 italic">No related posts available.</p>
            ) : (
              <div className="max-h-[600px] lg:max-h-[80vh] overflow-y-auto pr-4">
                <div className="flex flex-col gap-6">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post._id}
                      href={`/news/${post._id}`}
                      className="flex items-start bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Image
                        src={post.image || "/images/fallback.jpg"}
                        alt={post.newsTitle}
                        width={100}
                        height={60}
                        className="w-20 h-14 sm:w-28 sm:h-16 object-cover rounded-l-lg"
                      />
                      <div className="p-3 flex-1">
                        <h4 className="text-sm sm:text-base font-bold font-PottiSreeramulu line-clamp-2">
                          {post.newsTitle}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          <span>
                            {formatDistanceToNow(new Date(post?.createdAt), {
                                                    addSuffix: true, // Adds "ago"
                                                  })}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}