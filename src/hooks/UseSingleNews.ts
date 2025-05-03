import { getNewsById } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useSignleNews = (id: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { newsArticles, loading } = useSelector(
    (state: RootState) => state.news.singleNews
  );
  useEffect(() => {
    const fetchNews = async () => {
      try {
        await dispatch(getNewsById(id)).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, [dispatch, id]);
  return { newsArticles, loading };
};
