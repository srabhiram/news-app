import React from 'react'
import CarouselWithPagination from '../carousel-06'
import { NewsArticle } from '@/redux/features/news/news-slice'

export const CarouselLading = ({newsArticles}:{newsArticles:NewsArticle[]}) => {
  return (
    <div><CarouselWithPagination newsArticles={newsArticles}/></div>
  )
}
