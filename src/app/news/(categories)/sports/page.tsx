import LatestNewsCard from '@/components/cards/latest-news-card'
import { NewsArticle } from '@/interface/all-interfaces'
import { getSingleNews } from '@/lib/getSingleNews'
import React from 'react'

export default async function page() {
    const newsArticles:NewsArticle[] = await getSingleNews("sports")
  return (
   <LatestNewsCard newsArticles={newsArticles} categoryType='sports' heading='స్పోర్ట్స్' />
  )
}
