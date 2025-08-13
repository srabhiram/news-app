"use server";

export async function getRelatedPosts(params: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/news/${params}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data.newsArticles;
}
