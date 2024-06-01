import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { UserContext } from "../context/CurrentUserContext";
import { useRef } from "react";
import { X } from "lucide-react";
import { LogOut } from "lucide-react";

import { motion } from "framer-motion";
import Login from "./Login";
const Sidebar = ({ sidebarRef }) => {
  const { currentUser } = useContext(UserContext);

  const [isopen, setIsopen] = React.useState(false);

  const cartProduct = useSelector((value) => value.cartSlice.cart);

  function handleSideBar() {
    sidebarRef.current.style.transform = "translateX(-100%)";
  }

  const handleLogout = () => {
    let currentUserLogin = localStorage.getItem("login-user");
    if (currentUserLogin) {
      localStorage.removeItem("login-user");
      toast.success("logout successfully !");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      console.log("no user");
    }
  };
  return (
    <>
      <Login isopen={isopen} setIsopen={setIsopen} />
      <div
        ref={sidebarRef}
        className={` fixed sm:hidden z-[100] w-full transition-width duration-[0.6s] h-screen -translate-x-[100%]  bg-zinc-800 p-5`}
      >
        <div className="pb-4 ">
          <div className="float-end">
            <X onClick={handleSideBar} />
          </div>
          {currentUser.username ? (
            <p className="text-white  sm:block text-2xl  whitespace-nowrap font-medium ">
              Hey, <span className="capitalize"> {currentUser.username}</span>
            </p>
          ) : null}
        </div>
        <div
          className="flex relative my-5 border-b-[1px] pb-3"
          onClick={handleSideBar}
        >
          <Link to={"/"} className="flex gap-3 ">
            <div className="flex gap-3">
              <span className="text-3xl text-white"> Home</span>
            </div>
          </Link>
        </div>
        <div
          className="flex relative my-5 border-b-[1px] pb-3"
          onClick={handleSideBar}
        >
          <Link to={"/cart"} className="flex gap-3 ">
            <div className="flex gap-3">
              <span className="text-3xl text-white">Cart</span>
              {cartProduct.length > 0 && (
                <div className="pointer-events-none w-6 h-6  rounded-full bg-red-400  flex justify-center items-center">
                  <span className="p-1 text-white">{cartProduct.length}</span>
                </div>
              )}
            </div>
          </Link>
        </div>

        <div
          className="flex relative my-5 border-b-[1px] pb-3"
          onClick={handleSideBar}
        >
          <Link to={"/products"} className="flex gap-3 ">
            <div className="flex gap-3">
              <span className="text-3xl text-white">Product</span>
            </div>
          </Link>
        </div>

        {currentUser.email && currentUser?.username ? (
          <p
            onClick={handleSideBar}
            className="border-b-[1px] pb-3 text-3xl text-white flex gap-3 items-center"
          >
            Logout
            <LogOut
              className="cursor-pointer block sm:hidden"
              onClick={handleLogout}
              color="white"
              width={24}
              strokeWidth={2}
            />
          </p>
        ) : (
          <p
            className="text-white cursor-pointer block sm:hidden"
            onClick={() => {
              setIsopen(!isopen);
              handleSideBar();
            }}
          >
            Login/Signup
          </p>
        )}
      </div>
    </>
  );
};

export default Sidebar;
