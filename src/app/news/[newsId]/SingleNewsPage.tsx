"use client";
import { useState } from "react";
import { format } from "date-fns";
import { FaWhatsapp, FaLink, FaFacebook, FaTwitter } from "react-icons/fa";

import { EyeIcon } from "lucide-react";
import { NewsArticle } from "@/interface/all-interfaces";
import { categoryNames, distname } from "@/lib/navbar-items";
import useViewTracker from "@/hooks/useViewsTracker";
import ReactMarkdown from "react-markdown";
import RelatedPost from "@/components/RelatedPost";
import {
  handleCopyLink,
  handleTwitterShare,
  handleWhatsAppShare,
} from "@/lib/share-features";
import { FacebookShareButton } from "react-share";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
export default function SingleNewsPage({
  params,
  newsArticles,
  relatedArticles,
}: {
  params: { newsId: string };
  newsArticles: NewsArticle[];
  relatedArticles: NewsArticle[];
}) {
  const { newsId } = params;
  const [views, setViews] = useState<number>(0);

  // Increment views
  useViewTracker(newsId, setViews);

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
                width={250}
                height={150}
                className="rounded-t-md object-cover mx-auto lg:w-[300px]"
                priority
              />
              {/* <CldImage
                src={article.image}
                alt={article.newsTitle}
                preserveTransformations={true}
                width={800}
                height={400}
                quality="auto:eco"
                format="auto"
                dpr="auto"
                sizes="(max-width: 768px) 100vw, 80vw"
                className="w-full h-full object-cover"
                priority
              /> */}
            </div>

            {/* Article Content */}
            <div className="p-2 sm:p-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-telugu font-bold leading-relaxed mb-4">
                {article?.newsTitle}
              </h2>

              {/* Top row: Author, Date, Views */}
              <div className="text-gray-700 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <span className="font-medium capitalize">
                      {article.author}
                    </span>
                    <span>•</span>
                    <span>
                      {format(
                        new Date(article?.createdAt),
                        "dd MMM yyyy hh:mm a"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 ml-4 mr-1">
                    <EyeIcon className="w-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm sm:text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {views || article?.views}
                    </span>
                  </div>
                </div>

                {/* Bottom row: Share buttons */}
                <div className="mt-2 flex gap-2 place-self-end px-0.5">
                  <span className="text-center p-[7px] md:p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200">
                    <FacebookShareButton
                      url={`${window.location.origin}/news/${article._id}`}
                    >
                      <FaFacebook size={20} />
                    </FacebookShareButton>
                  </span>
                  <button
                    onClick={() => handleWhatsAppShare(article)}
                    className="text-center p-[7px] md:p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp size={20} />
                  </button>
                  <button
                    onClick={() => handleTwitterShare(article)}
                    className="text-center p-[7px] md:p-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors duration-200"
                    title="Share on X (Twitter)"
                  >
                    <FaTwitter size={20} />
                  </button>
                  <button
                    onClick={() => handleCopyLink(article._id)}
                    className="text-center p-[7px] md:p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-200"
                    title="Copy Link"
                  >
                    <FaLink size={20} />
                  </button>{" "}
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
                {article?.content.box1 ? (
                  <span className="prose-ul:list-disc prose whitespace-pre-wrap text-wrap text-base dark:text-zinc-300">
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => <span {...props} />,
                      }}
                    >
                      {`${article?.content.box1}\n\n${article?.content.box2}`}
                    </ReactMarkdown>
                  </span>
                ) : (
                  <span className="prose-ul:list-disc prose whitespace-pre-wrap text-wrap text-base dark:text-zinc-300">
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => <span {...props} />,
                      }}
                    >
                      {`${article?.content}`}
                    </ReactMarkdown>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <RelatedPost relatedPosts={relatedArticles} />
      </div>
    </div>
  );
}
