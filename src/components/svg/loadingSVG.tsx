import React from 'react'

export default function LoadingSvg() {
  return (
    <div className='flex sm:justify-center items-center sm:h-screen bg-white'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#1F3DFF" stroke="#1F3DFF" strokeWidth="10" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#1F3DFF" stroke="#1F3DFF" strokeWidth="10" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#1F3DFF" stroke="#1F3DFF" strokeWidth="10" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
    </div>
  )
}
