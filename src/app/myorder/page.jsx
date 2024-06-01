"use client";
import React, { useEffect } from "react";
import { instance } from "@/utils/instence";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "@/utils/ContextReducer";
import CartProduct from "@/Components/CartProduct";
import Loader from "@/Components/Loader";
const Myorder = () => {
  const[loader,setLoader] = useState(true)

  const { state, dispatch, user } = useContext(CartContext);
  const [orderData, setOrderData] = React.useState([]);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await instance.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/order-data-get`,
          {
            email: user?.email,
          }
        );
        if (response.status === 200) {
          setOrderData(response?.data?.data[0]?.order_data);
          setLoader(false)
        }
      } catch (error) {
        console.log(error);
        setLoader(false)
      }
      finally{
        setLoader(false)
      }
    }
    fetchProduct();
  }, [user]);

  return (
    <>
     {
      loader && <Loader/>
    }
      <div className="max-w-screen-xl mx-auto">
        {
          !orderData
          ?
          <h1 className="text-4xl text-center">No Order's Found 🙂</h1>
          :
          <div className=" ">
          {orderData && orderData.reverse().map((item) => <CartProduct item={item} />)}
        </div>
        }
      </div>
    </>
  );
};

export default Myorder;
