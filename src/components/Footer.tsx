import React from 'react'

export default function Footer() {
  return (
    <div className='flex flex-col items-center justify-center bg-[#3D3BF3] text-white py-4 mt-auto bottom-0 w-full '>
    <p className='text-center'>© {new Date().getFullYear()} SRS News. All rights reserved.</p>
      <p className='text-center'>Developed by <a href="https://abhiramsriramoji.vercel.app/" className='text-blue-200' target='_blank' rel='noopener noreferrer'>Abhiram</a></p>
    </div>
  )
}
