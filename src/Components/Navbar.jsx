"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "@/utils/ContextReducer";
import { instance } from "@/utils/instence";
import { CircleUserRound } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
const Navbar = () => {
  const [mount, setMount] = React.useState(false);
  const path = usePathname();

  //context
  const { state, user } = useContext(CartContext);

  React.useEffect(() => {
    setMount(true);
  }, []);

  // user Image
  const [storeImage, setStoreImage] = useState(null);

  async function getImage() {
    if (user?.email) {
      try {
        const res = await instance.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/file-upload/${user.email}`
        );
        if (res.status === 200) {
          setStoreImage(res?.data?.response);
        } else {
          setStoreImage(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getImage();
  }, [user.email]);

  // file handling
  const [userImage, setUserImage] = useState(null);
  const fileInput = useRef(null);
  const handleInputFileTrigger = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };
  const handleInputFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("email", user.email);

      try {
        const res = await instance.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user-avatar`,
          formData
        );
        if (res.status === 200) {
          toast.success("Image uploaded successfully");
          setTimeout(() => {
            window.location.reload()
          }, 1500);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  if (!mount) return null;

  return (
    <div className="shadow-md">
      <Toaster/>
      {path !== "/login" && path !== "/register" && (
        <div className=" max-w-screen-xl mx-auto relative ">
          <div className="navbar bg-base-100 hidden sm:flex">
            <div className="flex-1">
              <Link className="btn btn-ghost text-xl" href={"/"}>
                Delivery App
              </Link>
            </div>
            <div className="flex-none">
              <div className="dropdown dropdown-end hidden sm:flex gap-3 ">
                <Link href={"/cart"}>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="badge badge-sm indicator-item">
                        {state.length}
                      </span>
                    </div>
                  </div>
                </Link>

                <ul className="menu menu-horizontal px-1">
                  {localStorage.getItem("token") ? (
                    <>
                      {user?.isAdmin && (
                        <li>
                          <Link href={{ pathname: "/admin" }}>Dashboard</Link>
                        </li>
                      )}

                      <li>
                        <Link href={{ pathname: "myorder" }}> My order</Link>
                      </li>

                      <li>
                        <a
                          href={"/login"}
                          onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                          }}
                        >
                          Logout
                        </a>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link href={"/login"}>Login</Link>
                    </li>
                  )}
                </ul>

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        className=" object-cover object-top rounded-full shadow "
                        src={`/uploads/${storeImage?.image_endpoint}`}
                        onError={(e) => {
                          e.target.src =
                            "https://cdn1.vectorstock.com/i/1000x1000/65/90/business-icon-contact-person-in-flat-style-vector-31046590.jpg";
                        }}
                      />
                    </div>
                  </div>

                  {user.email !== "admin@gmail.com" && (
                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <form
                          onSubmit={handleInputFileTrigger}
                          encType="multipart/form-data"
                        >
                          <input
                            type="file"
                            ref={fileInput}
                            name="avatar"
                            onChange={handleInputFileChange}
                            id="avatar"
                            hidden
                          />
                          <button type="submit">Change Profile</button>
                        </form>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex py-4  mx-2 sm:hidden  items-center justify-between">
            <Link className="btn btn-ghost text-xl" href={"/"}>
              Delivery App
            </Link>
            {/* <MenuIcon
              className="cursor-pointer "
              onClick={() => setOpen(!open)}
            /> */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={`/uploads/${storeImage?.image_endpoint}`}
                    onError={(e) => {
                      e.target.src =
                        "https://cdn1.vectorstock.com/i/1000x1000/65/90/business-icon-contact-person-in-flat-style-vector-31046590.jpg";
                    }}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={{ pathname: "/" }}>Home</Link>
                </li>
                <li>
                  <Link href={"/cart"} className="flex items-center">
                    Cart
                    <span className="badge badge-sm indicator-item ml-2">
                      {state.length}
                    </span>
                  </Link>
                </li>
                <li>
                  {localStorage.getItem("token") ? (
                    <>
                      {user?.isAdmin && (
                        <li className="p-0">
                          <Link href={{ pathname: "/admin" }}>Dashboard</Link>
                        </li>
                      )}

                      <li className="p-0">
                        <Link href={{ pathname: "myorder" }}>My order</Link>
                      </li>

                      <li className="p-0">
                        <a
                          href={"/login"}
                          onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                          }}
                        >
                          Logout
                        </a>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link href={"/login"}>
                        {" "}
                        <PowerIcon /> Login
                      </Link>
                    </li>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
