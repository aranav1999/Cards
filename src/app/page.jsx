"use client"

import axios from "axios"
import { useEffect, useState, createContext } from "react"
import ProductCard from "./ProductCard/page";
import DataContext from "../Context/DataContext";
import ProductPage from "./ProductPage/page";

export default function Home() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const onClick = async () => {
     try {
      setLoading(true);
      const response = await axios.get("https://api.thecatapi.com/v1/images/search", {
        headers: {
          'Authorization': `Bearer ${process.env.API_KEY}` // Include the API key in headers
        }
      })
      console.log("Success", response.data);
      setData((prevData) => [...prevData, ...response.data]); 
      //setCurrentPage(1);
     } catch (error) {
      console.log(error);
     } finally{
      setLoading(false);    
    
     }
    }
    useEffect(() => {
      onClick(); // Fetch data when the component mounts
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteLastCard = () => {
      setData((prevData) => prevData.slice(0, prevData.length - 1));
    };
  //comment
  return (
    
   <div>
    <button type="button" onClick={onClick} className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded-full m-5">
      Fetch
    </button>
    <button type="button" onClick={deleteLastCard} className="bg-red-400 hover:bg-red-500 text-black font-bold py-2 px-4 rounded-full m-5">
      Delete
    </button>
    {loading ? (
      <p className="text-red-500">Loading...</p>
    ) : (
      <div>
        {/* {data.map((obj) => {    
          console.log("obj", obj)
          return (
            //  <img src={obj.url} alt={obj.url} key={obj.id} width={"500px"} />
           
            
            
          )
        })} */}
        <div className="card-container">
          {/* mapping the CurrentItems insted of data as it con */}
          {currentItems.map((obj) => (
              <DataContext.Provider key={obj.id} value={obj}>
                <ProductCard />
              </DataContext.Provider>
            ))}
          </div>

          {/* Section for pagination */}
          <div className="pagination flex justify-center mt-4 bottom-8 fixed left-1/2">
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 mx-1 rounded-full ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
      </div>
    )}
   </div> 
   
  )
}