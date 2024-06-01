"use client";
import React from "react";
import { useContext } from "react";
import { CartContext } from "@/utils/ContextReducer";
import { CirclePlus } from "lucide-react";
import { CircleMinus } from "lucide-react";
import { instance } from "@/utils/instence";
import { Toaster,toast } from "react-hot-toast";
const Cart = () => {
  const { state, dispatch, user } = useContext(CartContext);

  const handleIncrement = (item) => {

    dispatch({
      type: "UPDATE_QTY_INCREMENT",
      payload: {
        tempId: item.tempId,
        qty: item.qty,
        unitPrice: item.price / item.qty,
      },
    });
  };

  const handleDecrement = (item) => {

    dispatch({
      type: "UPDATE_QTY_DECREMENT",
      payload: {
        tempId: item.tempId,
        qty: item.qty,
        unitPrice: item.price / item.qty,
      },
    });
  };

  // checkout
  const handleCheckout = async () => {
    // dispatch({ type: "CLEAR" })
    try {
      const response = await instance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/order-data`,
        {
          order_data: state,
          email: user?.email,
          order_date: new Date().toDateString(),
        },
      
      );
      if (response.status === 200) {
        toast.success("Order Placed Successfully")
        setTimeout(() => {
          dispatch({ type: "CLEAR" });
        }, 1500);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Toaster position="top-center"/>
      {state.length > 0 ? (
        <div className="overflow-x-auto max-w-screen-xl mt-5 mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Item Name</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Price(₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {state &&
                state.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={item.img}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold capitalize">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="capitalize">{item.size}</td>
                      <td className="flex gap-3 items-center">
                        <CircleMinus
                          onClick={(e) =>{
                            return(
                            
                              item.qty <= 1
                              ? 
                              (
                                toast.success("Item Removed from Cart"),
                              dispatch({
                                  type: "REMOVE",
                                  payload: {
                                    id: index,
                                  },
                                })
                              )
                              : handleDecrement(item)
                            )
                          }
                           
                          }
                          className="hover:text-zinc-200 cursor-pointer hover:scale-105"
                        />
                        <span> {item.qty}</span>

                        <CirclePlus
                          onClick={() => handleIncrement(item)}
                          className="hover:text-zinc-200 cursor-pointer hover:scale-105"
                        />
                      </td>
                      <td>{item.price}</td>
                      <td>
                        <button
                          onClick={() => {
                            toast.success("Item Removed from Cart"),
                            dispatch({
                              type: "REMOVE",
                              payload: {
                                id: index,
                              },
                            });
                          }}
                          className="btn btn-ghost btn-xs bg-zinc-700 "
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="px-3 md:px-0">
            <h1 className="text-xl  md:text-2xl font-semibold mt-5 ">
              Grand Total :{" "}
              <span>
                ₹
                {state &&
                  state.reduce((acc, cur) => {
                    return acc + cur.price;
                  }, 0)}
                /-
              </span>
            </h1>

            <button
              onClick={handleCheckout}
              className="btn btn-sm md:btn-md btn-info mt-3 mb-2 rounded-md"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-2xl my-5">No item added in the cart</h1>
      )}
    </>
  );
};

export default Cart;
