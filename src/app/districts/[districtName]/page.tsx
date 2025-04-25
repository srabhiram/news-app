import React from 'react'
import DistrictPageClient from './DistrictPage'

export default async function DistrictPage( {params,
}: {
  params: Promise<{ districtName: string }>}) {
  return (
    <DistrictPageClient params={params} /> )
}
