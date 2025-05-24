import React from 'react'
import AdminDashboard from '../../../components/dashboard/Dashboard'
import { fetcNews } from '@/lib/fetchNews'

export default async function Dashboardpage() {
  const {newsArticles} = await fetcNews()

  return (
   <AdminDashboard newsArticles={newsArticles}/>
  )
}
