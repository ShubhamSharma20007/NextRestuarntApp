import React from 'react'
import { instance } from '@/utils/instence'


async function getData(item){
  try {
    const response  = await instance.get(`${process.env.NEXT_PUBLIC_BASE_URL}/single-item/${item}`)
    return response.data
  } catch (error) {
    return console.log(error)
    
  }
}

const Item =async({params}) => {
  const {item} =  params
  // item == id

  const singleItem = await getData(item)

  return (
    <>
    <div className=' w-full h-[90vh] flex justify-center items-center '>
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-80">
  <div className="relative h-56  overflow-hidden text-white  bg-clip-border rounded-t-xl bg-blue-gray-500 shadow-blue-gray-500/40">
    <img
      src={singleItem?.img}
      className='h-full w-full object-cover object-center'
      alt="card-image"
    />
  </div>
  <div className="p-6">
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      {singleItem?.name}
    </h5>
    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
     {singleItem?.description}
    </p>
  </div>
  <div className="p-6 pt-0">
    <button
      className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button"
    >
      {singleItem?.category}
    </button>
  </div>
</div>

    </div>
    </>
  )
}

export default Item