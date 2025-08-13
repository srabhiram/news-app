import React from 'react'
import AdminDashboard from '../../../components/dashboard/Dashboard'
import { fetcNews } from '@/lib/fetchNews'
import { getTokenData } from '@/helpers/getTokenData'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:"Dashboard - SRS News",
    description:"Admin Dashboard"
  };
}

export default async function Dashboardpage() {
  const {newsArticles} = await fetcNews({ content: true, pageParams: 1 });
  const currentUser = await getTokenData()
  return (
   <AdminDashboard initialData={newsArticles} currentUser={currentUser}/>
  )
}
