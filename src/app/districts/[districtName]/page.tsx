'use client';
import { getNewsByDistrict } from '@/redux/features/news/news-slice';
import { AppDispatch } from '@/redux/store';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default  function DistrictPage({ params }: {params: Promise<{ districtName: string }> }) {
    const  {districtName} = React.use(params);
    console.log(districtName)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        dispatch(getNewsByDistrict(districtName))
    },[dispatch, districtName])
  return (
    <div>{districtName}</div>
  )
}
