"use server";
export async function fetcNews({
  content = false,
  pageParams = 1,
  noLimit = false,
  type
}:{content?:boolean, pageParams?:number,noLimit?:boolean,type?:string}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/news/getNews?page=${pageParams}&content=${content}&noLimit=${noLimit}&type=${type}`,
    {
      cache: "force-cache",
      next: { revalidate: 60, tags: ["news"] },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch news");
  const { newsArticles, totalPages } = await res.json();
  return { newsArticles, totalPages };
}
