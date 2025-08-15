"use server";

import { News } from "@/interface/news.types";

export const fetcAllArticles = async ():Promise<News[]> => {
    let apiUrl;
    if (process.env.NODE_ENV === "production") {
      apiUrl = process.env.PROD_BACKEND_API;
    } else {
      apiUrl = process.env.DEV_BACKEND_API;
    }
    const res = await fetch(`${apiUrl}/news/all`, {
      method: "GET",
      cache: "default"
    });
    const data = await res.json();
    return data.data;
  };
