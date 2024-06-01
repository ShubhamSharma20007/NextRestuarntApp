"use client";
import React, { useEffect, useRef, useState } from "react";
import { instance } from "@/utils/instence";
import toast from "react-hot-toast";
import { CartContext } from "@/utils/ContextReducer";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import Notfound from "../not-found";
const Admin = () => {
  const { user } = useContext(CartContext);

  console.log(user);

  if (!user.isAdmin) {
    return <Notfound />;
  }
 


  const router = useRouter();
  const sidePriceOption = { single: "", double: "" };
  const pizzaPriceOption = { regular: "", medium: "", large: "" };
  const [Category, setCategory] = useState({
    name: "",
    price: "",
    description: "",
    img: "",
    category: "",
    foodType: "Veg",
  });

  const [file, setFile] = useState("");
  const avatarId = useRef(null);
  function handleInputFile() {
    avatarId.current.click();
  }

  const handleChangeFile = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const data = new FormData();
    data.append("file", selectedFile);

    try {
      const res = await instance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/file-upload`,
        data,
        {
          params: { user: user.email },
        }
      );
      if(res.status ===200){
        toast.success("Image Uploaded Successfully", {
          position: "top-center",
        })
       setTimeout(() => {
        window.location.reload()
       }, 2000);
      }
    } catch (error) {
      console.error("File upload error: ", error);
    }
  };

  // Image Get form server
  const [storeImage, setStoreImage] = useState(null);

  async function getImage() {
    if (user?.email) {
      try {
        const res = await instance.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/file-upload/${user.email}`
        );
        if (res.status === 200) {

          setStoreImage(res.data?.response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getImage();
  }, [user.email]);

  const handleChange = (e) => {
    setCategory((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
    if (e.target.name === "category") {
      if (e.target.value === "Pizza") {
        setCategory((prev) => {
          return { ...prev, price: pizzaPriceOption };
        });
      } else if (e.target.value === "BEVERAGES") {
        setCategory((prev) => {
          return { ...prev, price: sidePriceOption };
        });
      }
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product-create`,
        {
          ...Category,
        }
      );
      if (res.status === 200) {
        toast.success("Product Created Successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };




  return (
    <>
      <Toaster />

      <div className="bg-white dark:bg-gray-800 md:px-10">
        <div className="container  mx-auto bg-white dark:bg-gray-800 rounded">
          <div className="xl:w-full  border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
            <div className="flex gap-3 w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
              <button class="btn">Admin</button>

              <button
                class="btn"
                onClick={() => router.push("/admin/product-table")}
              >
                Product Table
              </button>
            </div>
          </div>
          <div className="container  mx-auto bg-white dark:bg-gray-800 rounded">
            <div className="mx-auto">
              <div className="xl:w-9/12 w-11/12    m-auto">
                <div className="rounded relative mt-8 h-72">
                  <img
                    src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg"
                    alt
                    className="w-full h-full object-cover rounded absolute shadow"
                  />
                  <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
                  <div className="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer ">
                   
                  </div>
                  <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                    <img
                      src={`/uploads/${storeImage?.image_endpoint}`}
                      onError={(e) => {
                        
                        e.target.src ="https://cdn1.vectorstock.com/i/1000x1000/65/90/business-icon-contact-person-in-flat-style-vector-31046590.jpg";
                      }}
                      alt
                      className="absolute z-0 h-full w-full object-cover object-top rounded-full shadow top-0 left-0 bottom-0 right-0"
                    />
                    <div className="absolute top-0 right-0 bottom-0 left-0 rounded-full z-0" />
                    <form className="cursor-pointer flex flex-col justify-center items-center relative z-10 text-gray-100">
                      <svg
                        onClick={handleInputFile}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-edit bg-zinc-600  absolute top-full right-0 mr-4 mt-4 p-1 cursor-pointer rounded-full"
                        width={30}
                       
                        height={30}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1={16} y1={5} x2={19} y2={8} />
                      </svg>
                      <input
                        type="file"
                        onChange={(e) => handleChangeFile(e)}
                        name="file"
                        id="file"
                        ref={avatarId}
                        hidden
                      />
                    </form>
                  </div>
                </div>
              </div>
              <form onSubmit={handleCreateProduct} className="w-full pb-4 ">
                <div className="max-w-screen-lg mx-auto flex justify-center items-center">
                 <div className="w-full p-3  md:p-0">
                 <div className="flex xl:w-3/5 lg:w-1/2 md:w-1/2 items-center gap-4 w-full mt-16">
                    <div className=" flex flex-col xl:w-1/2 lg:w-1/2 md:w-1/2 w-full">
                      <label
                        htmlFor="username"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        Item Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={Category.name}
                        onChange={(e) => handleChange(e)}
                        required
                        className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                        placeholder="Name..."
                      />
                    </div>
                    <div className="  flex flex-col xl:w-1/2 lg:w-1/2 md:w-1/2 w-full">
                      <label
                        htmlFor="username"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        category
                      </label>
                      <select
                        required
                        name="category"
                        onChange={(e) => handleChange(e)}
                        className="select bg-transparent rounded-md select-bordered w-full max-w-xs"
                      >
                        <option selected disabled>
                          Select category
                        </option>
                        <option value={"Pizza"}>Pizza</option>
                        <option value={"BEVERAGES"}>BEVERAGES</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex xl:w-3/5 lg:w-1/2 md:w-1/2 justify-between items-center gap-4 w-full flex-wrap  md:flex-nowrap">
                    {Category.price !== "" &&
                      Object.keys(Category.price).map((item, index) => (
                        <>
                          <div
                            className={`flex flex-col ${
                              Category.category === "Pizza"
                                ? "xl:w-1/4 lg:w-1/4 md:w-1/4"
                                : "xl:w-1/2 lg:w-1/2 md:w-1/2"
                            } mt-8 w-full`}
                          >
                            <label
                              htmlFor="username"
                              className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                            >
                              {item}
                            </label>
                            <input
                              required
                              type="number"
                              id="regular"
                              name={item}
                              value={Category.price[item]}
                              onChange={(e) =>
                                setCategory((prev) => {
                                  return {
                                    ...prev,
                                    price: {
                                      ...prev.price,
                                      [item]: e.target.value,
                                    },
                                  };
                                })
                              }
                              
                              className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                              placeholder={`${item} price`}
                            />
                          </div>
                        </>
                      ))}
                  </div>

                  <div className=" flex xl:w-3/5 lg:w-1/2 md:w-1/2 items-center gap-4 w-full mt-8">
                    <div className=" flex flex-col xl:w-1/2 lg:w-1/2 md:w-1/2 w-full">
                      <label
                        className=" text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Product Image{" "}
                        <span className=" text-[10px]">(Only Img URL)</span>
                      </label>
                      <input
                        name="img"
                        required
                        onInvalid={(e)=>e.target.setCustomValidity("Please Enter Image URL")}
                        value={Category.img}
                        onInput={(e)=>e.target.setCustomValidity("")}
                        onChange={(e) => handleChange(e)}
                        className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                        id="file_input"
                        type="url"
                        placeholder="Product Image"
                      />
                    </div>
                    <div className="  flex flex-col xl:w-1/2 lg:w-1/2 md:w-1/2 w-full">
                      <label
                        htmlFor="username"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        Food Type
                      </label>
                      <select
                        name="foodType"
                        value={Category.foodType}
                        onChange={(e) => handleChange(e)}
                        required
                        id="foodType"
                        className="select bg-transparent rounded-md select-bordered w-full max-w-xs"
                      >
                        <option>Veg</option>
                        <option>Non-Veg</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col xl:w-3/5 lg:w-1/2 md:w-1/2 w-full">
                    <label
                      htmlFor="about"
                      className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Description
                    </label>
                    <textarea
                      id="about"
                      name="description"
                      onChange={(e) => handleChange(e)}
                      required
                      value={Category.description}
                      className="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-500 dark:text-gray-400"
                      placeholder="Let the world know who you are"
                      rows={5}
                      defaultValue={""}
                    />
                    <p className="w-full text-right text-xs pt-1 text-gray-500 dark:text-gray-400">
                      Character Limit: 100
                    </p>
                  </div>

                  <div className="container  w-11/12 xl:w-full">
                    <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-start">
                    <button
                        className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
                        type="submit"
                      >
                        Create
                      </button>
                      <button
                        type="reset"
                        className="bg-gray-200 text-white focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded  px-6 py-2 text-xs ml-4"
                      >
                        Cancel
                      </button>
                    
                    </div>
                  </div>
                 </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
