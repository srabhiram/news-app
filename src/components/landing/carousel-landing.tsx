import React from 'react'
import CarouselWithPagination from '../carousel-06'
import { NewsArticle } from '@/interface/all-interfaces'

export const CarouselLading = ({newsArticles}:{newsArticles:NewsArticle[]}) => {
  return (
    <div><CarouselWithPagination newsArticles={newsArticles}/></div>
  )
}
