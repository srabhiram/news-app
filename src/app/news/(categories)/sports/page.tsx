import LatestNewsCard from '@/components/cards/latest-news-card'
import { NewsArticle } from '@/interface/all-interfaces'
import { getSingleNews } from '@/lib/getSingleNews'
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "స్పోర్ట్స్ - SRS News",
    description: "Latest News SRS News",
  };
}
export default async function page() {
    const newsArticles:NewsArticle[] = await getSingleNews({newsId:"sports", content:false})
  return (
   <LatestNewsCard newsArticles={newsArticles} categoryType='sports' heading='స్పోర్ట్స్' />
  )
}
