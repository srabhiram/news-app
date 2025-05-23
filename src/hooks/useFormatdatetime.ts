import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { te } from "date-fns/locale";
import { NewsArticle } from "@/redux/features/news/news-slice";

export const useFormattedDates = (newsArticles:NewsArticle[]) =>
  useMemo(() => {
    return newsArticles.map((article) =>
      formatDistanceToNow(new Date(article.createdAt), {
        addSuffix: true,
        locale: te,
      })
    );
  }, [newsArticles]);
