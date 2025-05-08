export async function fetcNews(cacheType?:RequestCache) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news/getNews`,
      {
        cache:  cacheType,
      }
    );
    const {newsArticles} = await res.json();
    return { newsArticles };
  }