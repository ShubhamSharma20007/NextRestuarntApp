"use client";
import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "@/utils/ContextReducer";
import { instance } from "@/utils/instence";
import { Toaster, toast } from "react-hot-toast";
import Loader from "@/Components/Loader";
import Notfound from "@/app/not-found";

const ProductTable = () => {
  const { user } = useContext(CartContext);
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchData = async () => {
    try {
      const res = await instance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product-create`
      );
      const data = res.data.data;
      if (res.status === 200) {
        setProduct(data);
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const res = await instance.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/remove-product/${id}`
      );
      if (res.status === 200) {
        toast.success("Product Deleted Successfully");
        fetchData();  // Refetch the product list after successful deletion
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  if (!user.isAdmin) {
    return <Notfound />;
  }

  return (
    <>
      {loader && <Loader />}
      <Toaster position="top-center" />
      {product.length > 0 ? (
        <div className="overflow-x-auto max-h-[70vh] overflow-y-auto max-w-screen-xl mt-5 mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Item Name</th>
                <th>Food-Type</th>
                <th>Price(₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {product &&
                product.map((item, index) => {
                  return (
                    <tr key={item._id}>
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
                      <td className="flex gap-3 items-center">
                        {item.foodType}
                      </td>
                      <td>
                        {item.category === "Pizza" ? (
                          <>
                            <small className="block whitespace-nowrap sm:whitespace-normal">
                              <span className="font-medium">Regular</span> :{" "}
                              {item.price.regular}
                            </small>
                            <small className="block whitespace-nowrap sm:whitespace-normal">
                              <span className="font-medium">Medium</span> :{" "}
                              {item.price.medium}
                            </small>
                            <small className="block whitespace-nowrap sm:whitespace-normal">
                              <span className="font-medium">Large</span> :{" "}
                              {item.price.large}
                            </small>
                          </>
                        ) : (
                          <>
                            <small className="block whitespace-nowrap sm:whitespace-normal">
                              <span className="font-medium">Single</span> :{" "}
                              {item.price.single}
                            </small>
                            <small className="block whitespace-nowrap sm:whitespace-normal">
                              <span className="font-medium">Double</span> :{" "}
                              {item.price.double}
                            </small>
                          </>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-ghost btn-xs bg-zinc-700"
                          onClick={() => deleteProduct(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center text-2xl my-5">No item added in the cart</h1>
      )}
    </>
  );
};

export default ProductTable;
