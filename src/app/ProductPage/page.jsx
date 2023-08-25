"use client";

import React from 'react'
import { useContext } from 'react'
import DataContext from "../../Context/DataContext"

const ProductPage = () => {
    const data = useContext(DataContext)
    if (!data) {
        return <div>Loading...</div>;
    }

    console.log(data);
    return (
        <>
            <div>Hello</div>
        </>
  )
}

export default ProductPage