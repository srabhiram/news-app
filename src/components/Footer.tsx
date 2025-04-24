import React from 'react'

export default function Footer() {
  return (
    <div className='flex flex-col items-center justify-center bg-[#3D3BF3] text-white py-4 fixed bottom-0 w-full z-10'>
    <p className='text-center'>© {new Date().getFullYear()} News App. All rights reserved.</p>
      <p className='text-center'>Developed by <a href="" className='text-blue-200' target='_blank' rel='noopener noreferrer'>Abhiram</a></p>
    </div>
  )
}
