import { getNews } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetNews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { newsArticles, loading } = useSelector((state: RootState) => state.news.generalNews);
  const [initLoading,setInitLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      if (newsArticles.length > 0){
        setInitLoading(false)
        return
      }; // Skip if data exists
     // Optional: Minimum loading time to prevent skeleton flashing
     const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 500));

     try {
       await Promise.all([dispatch(getNews()).unwrap(), minLoadingTime]);
     } catch (err) {
       console.error("Failed to fetch news:", err);
     } finally {
       setInitLoading(false);
     }
   };

   fetchNews();
  }, [dispatch, newsArticles.length]);

  return { newsArticles, loading: initLoading || loading};
};