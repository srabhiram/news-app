import React from 'react'

export default function Footer() {
  return (
    <div className='p-10 flex flex-col  bg-blue-700 text-white mt-auto bottom-0 w-full '>
    <p className='text-center'>© {new Date().getFullYear()} SRS News. All rights reserved.</p>
      <p className='text-center'>Developed by <a href="https://abhiramsriramoji.vercel.app/" className='text-blue-200' target='_blank' rel='noopener noreferrer'>Abhiram</a></p>
    </div>
  )
}
