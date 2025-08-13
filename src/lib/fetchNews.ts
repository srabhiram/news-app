"use server"
export async function fetcNews({content=false, pageParams=1,noLimit=false}) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news/getNews?page=${pageParams}&limit=15&content=${content}&noLimit=${noLimit}`,
      {
        cache: "force-cache",
        next:{tags:["news"]}
      
      }
    );
      if (!res.ok) throw new Error("Failed to fetch news");
     const { newsArticles, totalPages } = await res.json();
  return { newsArticles, totalPages };
  }
