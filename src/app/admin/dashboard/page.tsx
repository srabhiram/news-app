import React from 'react'
import AdminDashboard from '../../../components/dashboard/Dashboard'
import { fetcNews } from '@/lib/fetchNews'
import { getTokenData } from '@/helpers/getTokenData'

export default async function Dashboardpage() {
  const {newsArticles} = await fetcNews("no-store")
  const currentUser = await getTokenData()

  return (
   <AdminDashboard newsArticles={newsArticles} currentUser={currentUser}/>
  )
}
