// app/news/[newsId]/page.tsx

import { NewsArticle } from "@/interface/all-interfaces";
import SingleNewsPage from "./SingleNewsPage";
import { getSingleNews } from "@/lib/getSingleNews";
import { getRelatedPosts } from "@/lib/getRelatedPosts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = await params;
  try {
    const newsArticle = await getSingleNews(newsId);
    const news: NewsArticle = await newsArticle[0];

    // Trim content to the first 150 characters for description
    const trimmedContentBox = news.content
      ? news.content?.box1?.substring(0, 100)
      : "Latest Telugu news and updates.";
    const trimmedContent = JSON.stringify(news.content)
    return {
      title: `${news.newsTitle} - SRS News`,
      description: trimmedContentBox || trimmedContent.substring(0,100), // Use trimmed content
      openGraph: {
        title: news.newsTitle,
        description: trimmedContentBox || trimmedContent.substring(0,100), // Use trimmed content for OG description
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/news/${newsId}`,
        images: [
          {
            url:
              news.image ||
              `${
                process.env.NEXT_PUBLIC_API_URL
              }/api/og?title=${encodeURIComponent(news.newsTitle)}`,
            width: 1200,
            height: 630,
            alt: news.newsTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: news.newsTitle,
        description: trimmedContentBox || trimmedContent.substring(0,100), // Use trimmed content for Twitter description
        images: [news.image],
      },
    };
  } catch (error) {
    console.error("Failed to fetch metadata for newsId:", newsId, error);

    return {
      title: "News Not Found",
      description: "Unable to fetch news details.",
      openGraph: {
        title: "News Not Found",
        description: "Unable to fetch news details.",
        url: `https://yourdomain.com/news/${newsId}`,
        images: [
          {
            url: "https://yourdomain.com/fallback-og-image.jpg",
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }
}

// ✅ Page component
export default async function NewsIdPage({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const param = await params;
  const newsArticle: NewsArticle[] = await getSingleNews(param.newsId);
  const res: NewsArticle[] = await getRelatedPosts(
    newsArticle[0].district || newsArticle[0].category
  );
  const relatedPosts = res
    .filter((article) => article._id !== param.newsId)
    .slice(0, 5);
  return (
    <SingleNewsPage
      params={param}
      newsArticles={newsArticle}
      relatedArticles={relatedPosts}
    />
  );
}
