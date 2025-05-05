import LatestNewsCard from "@/components/landing/latest-news-card";

export default async function Home() {
  async function fetcNews() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news/getNews`,
      {
        cache: "no-store",
      }
    );
    const {newsArticles} = await res.json();
    return { newsArticles };
  }
  const {newsArticles} = await fetcNews()
  return <LatestNewsCard newsArticles={newsArticles}  />;
}
