export async function fetcNews(content?:boolean) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news/getNews?content=${content}`,
      {
        cache: "force-cache",
        next:{tags:["news"]}
      
      }
    );
    const {newsArticles} = await res.json();
    return { newsArticles };
  }
