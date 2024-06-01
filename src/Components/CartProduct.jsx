"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'

const CartProduct = ({item}) => {
const [copydata,setCopydata]=React.useState([...item])

useEffect(()=>{
  if (item && item.length > 1) {
    setCopydata(item.slice(1)) // Correctly use slice instead of splice
  }
},[item])

  return (
    <>
   
    <div className="my-3 px-3 md:px-3">
    <h1 className='border-b-[1px] my-2 pb-2 border-zinc-400'>{item[0].order_date}</h1>
     <div className="flex gap-5">
     {
      copydata.map((item)=>(
        <div className="card m-auto pt-5  md:m-0 w-64 my-2 bg-base-100 shadow-2xl flex-shrink-0  overflow-hidden">
        <figure className='h-52 relative w-full  '><Image  layout='fill' objectFit='cover' className='h-full w-full object-cover object-center' src={item?.img} alt="Shoes" /></figure>
        <div className="card-body p-4">
          <h2 className="card-title text-md">
            {item?.name}
            <div className="badge badge-secondary">{item?.category}</div>
          </h2>
          <p className='text-sm'>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">₹{item?.price}</div> 
            <div className="badge badge-outline">{item?.qty}</div>
            <div className="badge badge-outline">{item?.size}</div>
          </div>
        </div>
      </div>
      ))
     }
     </div>
    </div>
   
    </>
  )
}

export default CartProduct