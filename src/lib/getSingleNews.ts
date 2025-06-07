// lib/getSingleNews.ts
'use server'
export async function getSingleNews(newsId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${newsId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
  
    const data = await res.json();
    return data.newsArticles;
  }
  