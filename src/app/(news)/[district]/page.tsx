import React from 'react'

export default function page({params: { district }}: { params: { district: string } }) {    

  return (
    <div>{district}</div>
  )
}
