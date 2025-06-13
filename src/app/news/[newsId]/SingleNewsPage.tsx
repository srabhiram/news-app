"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { FaWhatsapp, FaLink, FaShareAlt } from "react-icons/fa";
import { EyeIcon } from "lucide-react";
import { NewsArticle } from "@/interface/all-interfaces";
import Image from "next/image";
import { categoryNames, distname } from "@/lib/navbar-items";
import useViewTracker from "@/hooks/useViewsTracker";
import { te } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import RelatedPost from "@/components/RelatedPost";

export default function SingleNewsPage({
  params,
  newsArticles,
  relatedArticles
}: {
  params: { newsId: string };
  newsArticles: NewsArticle[];
  relatedArticles:NewsArticle[]
}) {
  const { newsId } = params;

  const [relatedPosts, setRelatedPosts] = useState<NewsArticle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isShareOpen, setIsShareOpen] = useState<string | null>(null);
  const [views, setViews] = useState<number>(0);

  // // Fetch related posts
  // useEffect(() => {
  //   const fetchRelatedPosts = async () => {
  //     if (!newsArticles[0]) return;

  //     const param = newsArticles[0].district || newsArticles[0].category;
  //     if (!param) return;

  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/news/${param}`,
  //         {
  //           method: "GET",
  //           headers: { "Content-Type": "application/json" },
  //           cache: "no-store",
  //         }
  //       );
  //       if (!response.ok)
  //         throw new Error(`HTTP error! Status: ${response.status}`);

  //       const { newsArticles: posts } = await response.json();

  //       if (!Array.isArray(posts))
  //         throw new Error("Invalid newsArticles array");

  //       setRelatedPosts(
  //         posts.filter((post: NewsArticle) => post._id !== newsId).slice(0, 5)
  //       );
  //       setError(null);
  //     } catch (err) {
  //       console.error("Error fetching related posts:", err);
  //       setRelatedPosts([]);
  //       setError((err as Error).message || "Failed to load related posts.");
  //     }
  //   };

  //   fetchRelatedPosts();
  // }, [newsArticles, newsId]);

  // Increment views
  useViewTracker(newsId, setViews);

  // Memoize formatted dates for related posts
  const formattedRelatedDates = useMemo(
    () =>
      relatedPosts.map((post) =>
        formatDistanceToNow(new Date(post.createdAt), {
          addSuffix: true,
          locale: te,
        })
      ),
    [relatedPosts]
  );

  const handleCopyLink = (articleId: string) => {
    navigator.clipboard
      .writeText(`${window.location.origin}/news/${articleId}`)
      .then(() => {
        alert("Link copied to clipboard!");
      });
  };

  const handleWhatsAppShare = (article: { _id: string; newsTitle: string }) => {
    const articleUrl = `${window.location.origin}/news/${article._id}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        `Check out this news article: ${article.newsTitle} - ${articleUrl}`
      )}`,
      "_blank"
    );
  };

  const toggleShareOptions = (articleId: string) => {
    setIsShareOpen((prev) => (prev === articleId ? null : articleId));
  };

  const article = newsArticles[0];

  return (
    <div className=" container mx-auto px-1 sm:px-6 lg:px-8 pb-8 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Main Article */}
        <div className="w-full lg:w-3/4">
          <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-md min-h-fit shadow-md ">
            {/* Article Image */}
            <div className="w-full  flex justify-center items-center">
              <Image
                src={article?.image}
                alt={article?.newsTitle}
                width={700}
                height={250}
                style={{ height: "auto", width: "auto" }}
                className="rounded-t-md object-cover w-full mx-auto"
              />
            </div>

            {/* Article Content */}
            <div className="p-2 sm:p-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-PottiSreeramulu font-bold leading-relaxed mb-4">
                {article?.newsTitle}
              </h2>

              {/* Meta Section */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm sm:text-sm text-gray-600 dark:text-gray-400 font-PottiSreeramulu">
                    <span className="capitalize font-bold">
                      {article?.author}
                    </span>{" "}
                    •{" "}
                    {format(
                      new Date(article?.createdAt),
                      "dd MMM yyyy hh:mm a"
                    )}
                  </p>
                </div>
                <div className="relative flex items-center gap-3">
                  <div className=" flex items-center gap-1">
                    <EyeIcon className="w-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm sm:text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {views || article?.views || 0}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleShareOptions(article._id)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-300"
                    title="Share"
                    aria-label="Share article"
                  >
                    <FaShareAlt className="w-4 sm:w-5" />
                  </button>
                  {isShareOpen === article?._id && (
                    <div className="absolute top-10 right-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 flex flex-col gap-2 z-10">
                      <button
                        onClick={() => handleWhatsAppShare(article)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm transition-colors duration-300"
                      >
                        <FaWhatsapp size={14} /> WhatsApp
                      </button>
                      <button
                        onClick={() => handleCopyLink(article._id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm transition-colors duration-300"
                      >
                        <FaLink size={14} /> Copy Link
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Article Content */}
              <p
                className="text-base text-wrap lg:text-lg text-gray-700 dark:text-zinc-300 mt-4 tracking-wide leading-loose"
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                  wordSpacing: "-2px",
                }}
              >
                <b className="inline">
                  {article.district
                    ? distname(article.district)
                    : categoryNames(article.category)}
                </b>
                {": "}
                <span className="prose-ul:list-disc prose whitespace-pre-wrap text-wrap text-base dark:text-zinc-300">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <span {...props} />,
                    }}
                  >
                    {article?.content}
                  </ReactMarkdown>
                </span>
              </p>
            </div>
            
          </div>
        </div>
         <RelatedPost relatedPosts={relatedArticles}/>
      </div>
    </div>
  );
}
