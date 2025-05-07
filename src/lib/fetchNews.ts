export async function fetcNews() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news/getNews`,
      {
        cache: "no-cache",
      }
    );
    const {newsArticles} = await res.json();
    return { newsArticles };
  }