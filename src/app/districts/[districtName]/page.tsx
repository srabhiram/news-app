import React from 'react'
import { Metadata } from 'next'
import LatestNewsCard from '@/components/cards/latest-news-card';
import { distname } from '@/lib/navbar-items';
import { NewsArticle } from '@/interface/all-interfaces';
import { getSingleNews } from '@/lib/getSingleNews';
import InfiniteCard from '@/components/cards/infinity-scroll-card';

export async function generateMetadata({ params }: {  params: Promise<{ districtName: string }> }): Promise<Metadata> {
  const param = (await params).districtName
  return {
    title: `${param} - SRS News`,
    description: `${param} news, SRS News, local news`
  };
}
export default async function DistrictPage( {params,
}: {
  params: Promise<{ districtName: string }>}) {  
   const param = await params;
    const newsArticles: NewsArticle[] = await getSingleNews({newsId:param.districtName,content:false,page:1});
    const districtName = distname(param.districtName)
    return (
      <InfiniteCard initialData={newsArticles} districtName={`${param.districtName}`}/>)
}
