'use client'
import Image from 'next/image'
import React from 'react'
import LoadingSvg from '../svg/loadingSVG'

export default function LatestNewsCard() {
   const loading = true
    if(loading){
        return (
                <LoadingSvg />
          
        )
    }
  return (
   <div>
        <h1 className="text-2xl font-PottiSreeramulu font-bold mt-1 mb-6">తాజా వార్తలు</h1>
        <div className="border p-4 mb-4 rounded-lg shadow-md">
            <Image src="/images/news.jpg" alt="News" width={500} height={300} className="rounded" />
            <h2 className="text-xl font-bold mt-2">News Title</h2>
            <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold capitalize">Author Name</span> •{" "}
            <span>5 days ago</span>
            </p>
            <p className="text-gray-700 font-PottiSreeramulu">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
        <LoadingSvg />
   </div>

  )
}
