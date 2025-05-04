import { getNewsByDistrict } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

export const useGetNewsByParams = (districtName:string)=>{
    const dispatch = useDispatch<AppDispatch>();
    const {newsArticles, loading} = useSelector((state:RootState)=>state.news.districtNews)
      const [initLoading, setInitLoading] = useState(true)
    
    useEffect(()=>{
        const fetchNewsbyParams = async()=>{
            // Optional: Skip fetch if data exists for this district (uncomment if needed)
      
      if (newsArticles.length > 0) {
        setInitLoading(false);
        return;
      }
      

      // Optional: Minimum loading time to prevent skeleton flashing
      const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 500));

      try {
        await Promise.all([dispatch(getNewsByDistrict(districtName)).unwrap(), minLoadingTime]);
      } catch (err) {
        console.error("Failed to fetch news by district:", err);
      } finally {
        setInitLoading(false);
      }
    };

    fetchNewsbyParams();
    },[dispatch,districtName,newsArticles.length])
    return {newsArticles, loading:initLoading || loading}
}