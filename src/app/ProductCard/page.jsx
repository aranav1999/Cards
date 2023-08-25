"use client"

import React from "react";
import { useContext } from "react";
//import DataContext from "../../Context/DataContext";
import DataContext from "../../Context/DataContext";
import { useRouter } from "next/navigation";

const ProductCard = () => {
    const router = useRouter();
    const data = useContext(DataContext); // Use the context
   
  return (
    <>
      <div className="relative m-7 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      {/* {data.map((item) => (
          
        ))} */}
        <div key={data.id}>
            <a
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              href="#"
            >
              <img
                className="object-cover"
                src={data.url}
                alt="product image"
                onClick={() => {router.push("/ProductPage")}}
              />
            </a>
            <div className="mt-4 px-5 pb-5">
              <a href="#" onClick={() => {router.push("/ProductPage")}}>    
                <h5 className="text-xl tracking-tight text-slate-900">
                  {data.id}
                </h5>
              </a>
            </div>
          </div>    
      </div>    
    </>
  );
};

export default ProductCard;
