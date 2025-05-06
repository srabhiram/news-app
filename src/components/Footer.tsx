import React from 'react'

export default function Footer() {
  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 mt-auto bottom-0 w-full '>
    <p className='text-center'>© {new Date().getFullYear()} SRS News. All rights reserved.</p>
      <p className='text-center'>Developed by <a href="https://abhiramsriramoji.vercel.app/" className='text-shadow-blue-300' target='_blank' rel='noopener noreferrer'>Abhiram</a></p>
    </div>
  )
}
