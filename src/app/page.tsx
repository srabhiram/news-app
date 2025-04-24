'use client'
import LatestNewsCard from "@/components/news-card/latest-news-card";
import LoadingSvg from "@/components/svg/loadingSVG";
import { getNews } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { newsArticles, success } = useSelector(
    (state: RootState) => state.news
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch, success]);
  console.log(newsArticles);
  return (
    <Suspense fallback={<LoadingSvg />}>
      <LatestNewsCard newsArticles={newsArticles} success={success} />
    </Suspense>
  );
}
