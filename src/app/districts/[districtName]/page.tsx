import React from 'react'
import { Metadata } from 'next'
import LatestNewsCard from '@/components/cards/latest-news-card';
import { distname } from '@/lib/navbar-items';
import { NewsArticle } from '@/interface/all-interfaces';
import { getSingleNews } from '@/lib/getSingleNews';

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
    const newsArticles: NewsArticle[] = await getSingleNews(param.districtName);
    const districtName = distname(param.districtName)
    return (
      <LatestNewsCard newsArticles={newsArticles} heading={`${districtName} వార్తలు`}/>)
}
