"use client";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { FaWhatsapp, FaLink, FaShareAlt } from "react-icons/fa";
import { EyeIcon } from "lucide-react";
import SingleNewsCardSkeleton from "@/components/skeletons/single-news-card";
import { getNewsByParam, NewsArticle } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";


export default function SingleNewsPage({ params }:   {params: { newsId: string }}
) {
  const { newsId } = params;
  const dispatch = useDispatch<AppDispatch>();
  const { newsArticles, loading } = useSelector((state: RootState) => state.news);
  const [relatedPosts, setRelatedPosts] = useState<NewsArticle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isShareOpen, setIsShareOpen] = useState<string | null>(null);
  const [views, setViews] = useState<number>(0);

  // Fetch news article
  useEffect(() => {
    dispatch(getNewsByParam(newsId));
  }, [dispatch, newsId]);

  // Fetch related posts
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!newsArticles[0]?.district) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/news/${newsArticles[0].district}`,
          { method: "GET", headers: { "Content-Type": "application/json" }, cache: "no-store" }
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const { newsArticles: posts } = await response.json();
        if (!Array.isArray(posts)) throw new Error("Invalid newsArticles array");
        setRelatedPosts(posts.filter((post: NewsArticle) => post._id !== newsId));
        setError(null);
      } catch (err) {
        console.error("Error fetching related posts:", err);
        setRelatedPosts([]);
        setError((err as Error).message || "Failed to load related posts.");
      }
    };
    if (newsArticles.length > 0) fetchRelatedPosts();
  }, [newsArticles, newsId]);

  // Increment views
  useEffect(() => {
    const key = `viewed-news-${newsId}`;
    if (localStorage.getItem(key)) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/views/${newsId}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setViews(data.views);
        localStorage.setItem(key, "true");
      })
      .catch((err) => console.error("Error incrementing views:", err));
  }, [newsId]);

  // Memoize formatted dates for related posts
  const formattedRelatedDates = useMemo(
    () => relatedPosts.map((post) => formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })),
    [relatedPosts]
  );

  const handleCopyLink = (articleId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/news/${articleId}`).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleWhatsAppShare = (article: { _id: string; newsTitle: string }) => {
    const articleUrl = `${window.location.origin}/news/${article._id}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`Check out this news article: ${article.newsTitle} - ${articleUrl}`)}`,
      "_blank"
    );
  };

  const toggleShareOptions = (articleId: string) => {
    setIsShareOpen((prev) => (prev === articleId ? null : articleId));
  };

  if (loading) return <SingleNewsCardSkeleton />;
  if (!newsArticles.length) return <p className="text-gray-500 italic text-center">No news articles available.</p>;

  const article = newsArticles[0];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Main Article */}
        <div className="w-full lg:w-3/5">
          <Image
            src={article.image || "/images/fallback.jpg"}
            alt={article.newsTitle}
            width={800}
            height={400}
            className="rounded-md w-full h-[200px] sm:h-[300px] lg:h-[450px] object-cover my-4"
            priority
          />
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold font-PottiSreeramulu">{article.newsTitle}</h2>
            </div>
            <div className="flex items-center justify-between mt-2 border-b pb-2">
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="capitalize font-bold">{article.author}</span> •{" "}
                {format(new Date(article.createdAt), "dd MMM yyyy hh:mm a")}
              </p>
              <div className="flex items-center space-x-2">
                <EyeIcon className="w-4 sm:w-5" />
                <span className="font-semibold">{views || article.views || 0}</span>
                <button
                  onClick={() => toggleShareOptions(article._id)}
                  className="p-2 text-gray-600 hover:text-gray-800"
                  title="Share"
                  aria-label="Share article"
                >
                  <FaShareAlt className="w-4 sm:w-5" />
                </button>
                {isShareOpen === article._id && (
                  <div className="absolute top-10 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex flex-col gap-2 z-10">
                    <button
                      onClick={() => handleWhatsAppShare(article)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                    >
                      <FaWhatsapp size={14} /> WhatsApp
                    </button>
                    <button
                      onClick={() => handleCopyLink(article._id)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                    >
                      <FaLink size={14} /> Copy Link
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mt-4 tracking-wide leading-7">{article.content}</p>
          </div>
        </div>

        {/* Related Posts */}
        <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
          <h3 className="text-xl sm:text-2xl font-bold font-PottiSreeramulu mb-6">సంబంధిత వార్తలు</h3>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : relatedPosts.length === 0 ? (
            <p className="text-gray-500 italic">No related posts available.</p>
          ) : (
            <div className="max-h-[600px] lg:max-h-[80vh] overflow-y-auto pr-4 space-y-4">
              {relatedPosts.map((post, index) => (
                <Link
                  key={post._id}
                  href={`/news/${post._id}`}
                  className="flex items-center bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={post.image || "/images/fallback.jpg"}
                      alt={post.newsTitle}
                      width={100}
                      height={60}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-l-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 p-3">
                    <h4 className="text-sm sm:text-base font-bold font-PottiSreeramulu line-clamp-2">{post.newsTitle}</h4>
                    <p className="text-xs text-gray-600 mt-1">{formattedRelatedDates[index]}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}