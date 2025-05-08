import LatestNewsCard from "@/components/landing/latest-news-card";
import { fetcNews } from "@/lib/fetchNews";

export default async function Home() {
  
  const {newsArticles} = await fetcNews("no-store")
  return <LatestNewsCard newsArticles={newsArticles}  />;
}
