import React, {useState, useEffect} from "react";
import Layout from './Layout';
import Card from './Card';
import {getCategories} from "./apiCore";
import Checkbox from './Checkbox';

// Component that sends request to backend
// and displays products based on filters
const Shop = () => {

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  // Filter is an object containing an array of
  // categoryIds and an array of price ranges
  // FilterBy is either by category or by price
  const handleFilters = (filters, filterBy) => {
    console.log("SHOP", filters, filterBy);
  }

  useEffect(() => {
    init();
  },[])

  return (
    <Layout title="Shop" description="Find your jam" className="container-fluid">

      <div className="row">

        <div className="col-4">
         {/* Left sidebar - category display */}
         <h4>Filter by categories</h4>
         <ul>
           {/* Pass categories and handleFilters to Checkbox */}
          {<Checkbox categories={categories} handleFilters={(filters)=>handleFilters(filters, 'category')}/>}
          </ul>
        </div>
        <div className="col-8">
            {/* Right sidebar -  */}

        </div>

      </div>



  </Layout>
  )
}

export default Shop;
