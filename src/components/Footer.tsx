import React from 'react'

export default function Footer() {
  return (
    <div className=' dark:border-t-2 rounded-t-md p-10 flex flex-col dark:text-white  bg-blue-100/70 dark:bg-zinc-950/80 text-zinc-950 mt-auto bottom-0 w-full '>
    <p className='text-center'>© {new Date().getFullYear()} SRS News. All rights reserved.</p>
      <p className='text-center'>Developed by <a href="https://abhiramsriramoji.vercel.app/" className='text-blue-700 font-medium' target='_blank' rel='noopener noreferrer'>Abhiram</a></p>
    </div>
  )
}
