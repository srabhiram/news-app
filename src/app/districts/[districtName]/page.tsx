import React from 'react'
import DistrictPageClient from './DistrictPage'
import { Metadata } from 'next'

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
  return (
    <DistrictPageClient params={params} /> )
}
