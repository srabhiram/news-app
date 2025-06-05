// app/news/[newsId]/page.tsx

import { NewsArticle } from "@/interface/all-interfaces";
import SingleNewsPage from "./SingleNewsPage";
import { getSingleNews } from "@/lib/getSingleNews";



export async function generateMetadata({ params }: {params : Promise<{newsId:string}>}) {
  const { newsId } = await params;
  try {
    const newsArticle = await getSingleNews(newsId)
    const news: NewsArticle = await newsArticle[0]

    // Trim content to the first 150 characters for description
    const trimmedContent = news.content ? news.content.substring(0, 150) : "Latest Telugu news and updates.";

    return {
      title: `${news.newsTitle} - SRS News`,
      description: trimmedContent,  // Use trimmed content
      openGraph: {
        title: news.newsTitle,
        description: trimmedContent,  // Use trimmed content for OG description
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/news/${newsId}`,
        images: [
          {
            url: news.image || `${process.env.NEXT_PUBLIC_API_URL}/api/og?title=${encodeURIComponent(news.newsTitle)}`,
            width: 1200,
            height: 630,
            alt: news.newsTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: news.newsTitle,
        description: trimmedContent,  // Use trimmed content for Twitter description
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
export default async function NewsIdPage({ params }: {params : Promise<{newsId:string}>}) {
  const param = await params;
  const newsArticle:NewsArticle[] = await getSingleNews(param.newsId)
  return <SingleNewsPage params={param} newsArticles={newsArticle} />;
}
