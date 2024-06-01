'use client'
import React, { useState } from "react";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "@/utils/ContextReducer";
import Link from "next/link";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const Card = ({ item }) => {
  let priceOption =Object.keys(item.price)
  const [qty,setQty] = useState(1)
  const [itemPrice,setItemprice] = useState(Object.keys(item.price)[0])


  //  useContext
  const {state,dispatch} =  useContext(CartContext)
  
  const handleCartItem = async (currentItem) => {
    const tempId = currentItem["_id"] + itemPrice;
    const updateItem = state.find((cartItem) => cartItem.tempId === tempId);

    if (updateItem) {
      toast.success("Item updated in cart")
      dispatch({
        type: "UPDATE",
        payload: {
          tempId: tempId,
          qty: qty,
          price: parseInt(currentItem.price[itemPrice]) * qty,
        },
      });
    } else {
      toast.success("Item added to cart")
      dispatch({
        type: "ADD",
        payload: {
          id: currentItem["_id"],
          tempId: tempId,
          category: currentItem.category,
          name: currentItem.name,
          size: itemPrice,
          qty: qty,
          img: currentItem.img,
          price: parseInt(currentItem.price[itemPrice]) * qty,
          foodType: currentItem.foodType,
        },
      });
    }
  };
  return (
    <>
    <Toaster position="top-center"/>
      <div className="card w-64 my-2 bg-base-100 shadow-2xl flex-shrink-0 border border-zinc-700 overflow-hidden">
        <figure className="h-40 w-full">
        <Link href={{pathname:'item/[item]'}} as={{pathname:`/item/${item["_id"]}`}}>
          <img src={item.img}  className="h-full w-full object-cover " />
          </Link>
        </figure>
        <div className="card-body px-3 py-3 bg-zinc-900">
          <h2 className="card-title text-md whitespace-nowrap text-[15px]">

            <Image
              width={18}
              height={18}
              alt="image"
              src={
                item.foodType != "Veg"
                  ? "https://cdn.vectorstock.com/i/1000v/00/43/non-vegetarian-sign-veg-logo-symbol-vector-50890043.jpg"
                  : "https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png"
              }
            ></Image>
            
            {item.name}
          </h2>
          <p className="text-sm">
           {item.description.length > 60 ? item.description.slice(0,60) + "...." : item.description}
          </p>

          <div className="flex justify-between">
            <div className="w-1/3">
              <select className="select select-bordered select-sm w-full   max-w-xs" onChange={(e)=>setQty(e.target.value)}>
                <option selected value={1}>
                  1
                </option>
              {
                Array.from(Array(6),(e,i)=>{
                  return <option key={i+1} value={i+2} >{i+2}</option>
                })
              }
              </select>
            </div>
            <div className="w-1/2">
              <select className="select select-bordered text-xs w-full max-w-xs select-sm " onChange={(e)=>setItemprice(e.target.value)}>
                {
                  priceOption.map((item,index)=>{
                    return <option key={index} value={item}>{item}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className="card-actions flex  mt-2 w-full  justify-between items-center">
            <button className=" text-xs btn btn-sm py-2 hover:bg-zinc-700 " onClick={(e)=>handleCartItem(item)}>Add to cart</button>
            <div>
              <p className="text-sm text-end text-gray-300">₹{parseInt(item.price[itemPrice]) * qty }</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
