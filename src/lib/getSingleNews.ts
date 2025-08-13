// lib/getSingleNews.ts
'use server'
export async function getSingleNews({newsId,content=false,page=1}:{newsId:string,content:boolean,page?:number}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${newsId}?content=${content}&page=${page}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store"
    });
  
    const data = await res.json();
    return data.newsArticles;
  }
  