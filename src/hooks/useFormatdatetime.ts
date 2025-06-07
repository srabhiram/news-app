import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { te } from "date-fns/locale";
import { NewsArticle } from "@/interface/all-interfaces";

export const useFormattedDates = (newsArticles:NewsArticle[]) =>
  useMemo(() => {
    if(newsArticles){
    return newsArticles?.map((article) =>
      formatDistanceToNow(new Date(article.createdAt), {
        addSuffix: true,
        locale: te,
      })
    )};
  }, [newsArticles]);
