"use client";
import Caraousel from "@/Components/Caraousel";
import Card from "@/Components/Card";
import { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import { instance } from "@/utils/instence";
import Loader from "@/Components/Loader";
import { CldUploadButton } from "next-cloudinary";

export default function Home() {
  const[loader,setLoader] = useState(true)
  // data fetch from database
  const [dataAll, setDataAll] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`${process.env.NEXT_PUBLIC_BASE_URL}/product-create`);
      const data = res.data.data;
     if(res.status === 200){
      setDataAll(data);
      setLoader(false);
     }
      } catch (error) {
        console.log(error.message)
        setLoader(false);
      }
      finally{
        setLoader(false);
      }
    }
    fetchData()
    
  }, []);



  let unqiueCategory = new Set();
  const handleData = () => {
    dataAll && dataAll.map((item) => unqiueCategory.add(item.category));
  };

  handleData();
  const uniqueCate = [...unqiueCategory];

  // fillter
  const [selected, setSelected] = useState("All");
  let uniqueFilterCategory = new Set();
  function handleFilter() {
    dataAll &&
      dataAll.map((item) => {
        return uniqueFilterCategory.add(item.foodType);
      });
  }
  handleFilter();
  const uniqueFilter = Array.from(uniqueFilterCategory);

  const handleBackground = (category) => {
    setSelected(category);
  };
  return (
    <>
    {
      loader && <Loader/>
    }

      <Caraousel />
      <div className="max-w-screen-xl mx-auto flex gap-3 mt-4 px-2 md:px-0">
        <button
          className={`btn btn-sm hover:scale-105 ${
            selected === "All" ? "bg-zinc-600" : null
          }`}
          onClick={() => handleBackground("All")}
        >
          All
        </button>
        {uniqueFilter &&
          uniqueFilter.map((category, index) => {
            return (
              <button
                key={index}
                className={`btn btn-sm  hover:scale-105  ${
                  selected === category ? "bg-zinc-600" : null
                }`}
                onClick={() => handleBackground(category)}
              >
                <Image
                  width={15}
                  className=""
                  alt="image"
                  height={15}
                  src={
                    category != "Veg"
                      ? "https://cdn.vectorstock.com/i/1000v/00/43/non-vegetarian-sign-veg-logo-symbol-vector-50890043.jpg"
                      : "https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png"
                  }
                ></Image>
                {category}
              </button>
            );
          })}
      </div>
      <div>
        {uniqueCate &&
          uniqueCate.map((category, index) => (
            <div className="px-2 md:px-0" key={index}>
              <div
                className="text-xl  mt-5  py-2 max-w-screen-xl mx-auto"
                key={index}
              >
                <h1 className="pb-2 text-4xl font-semibold">{category}</h1>
                <hr />
              </div>
              <div className="flex flex-wrap justify-center gap-5 mt-10">
                {dataAll &&
                  dataAll
                    ?.filter((item) => category === item.category)
                    ?.filter(
                      (item) => selected === "All" || selected === item.foodType
                    )
                    ?.map((item, index) => {
                      return <Card key={index} item={item} />;
                    })}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
