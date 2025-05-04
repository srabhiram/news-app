import { getNewsById } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useSignleNews = (id: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { newsArticles, loading } = useSelector(
    (state: RootState) => state.news.singleNews
  );
  const [initLoading, setInitLoading] = useState(true)
  useEffect(() => {
    const fetchNews = async () => {
      
      const minLoadingTime = new Promise((resolve)=>setTimeout(resolve, 500))
      try {
        await Promise.all([dispatch(getNewsById(id)).unwrap(), minLoadingTime]);
      } catch (error) {
        console.error(error);
      } finally{
        setInitLoading(false)
      }
    };
    fetchNews();
  }, [dispatch, id, newsArticles.length]);
  return { newsArticles, loading: initLoading || loading };
};
