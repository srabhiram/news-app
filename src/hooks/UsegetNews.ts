import { getNews } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetNews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { newsArticles, loading } = useSelector((state: RootState) => state.news.generalNews);

  useEffect(() => {
    const fetchNews = async () => {
      if (newsArticles.length > 0) return; // Skip if data exists
      try {
        await dispatch(getNews()).unwrap();
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };
    fetchNews();
  }, [dispatch, newsArticles.length]);

  return { newsArticles, loading };
};