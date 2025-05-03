import { getNewsByDistrict } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export const useGetNewsByParams = (districtName:string)=>{
    const dispatch = useDispatch<AppDispatch>();
    const {newsArticles, loading} = useSelector((state:RootState)=>state.news.districtNews)
    useEffect(()=>{
        const fetchNewsbyParams = async()=>{
            try {
                await dispatch(getNewsByDistrict(districtName)).unwrap()
            } catch (error) {
                console.log(error)
            }
        }
        fetchNewsbyParams()
    },[dispatch,districtName])
    return {newsArticles, loading}
}