import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";
import {prices} from "./fixedPrices";

// Component that sends request to backend
// and displays products based on filters
const Shop = () => {
  // Store category ids in the state
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  // State holding all categories
  // to be shown on the left sidebar
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  // Fetch categories from backend
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  // filter is an object containing an array of
  // categoryIds and an array of price ranges
  // filterBy is either by category or by price
  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    // Update filters with cateogry or price
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout
      title="Shop"
      description="Find your jam"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          {/* Left sidebar - category display */}
          <h4>Filter by categories</h4>
          <ul>
            {/* Pass categories and handleFilters to Checkbox */}
            {
              <Checkbox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, "category")}
              />
            }
          </ul>
        </div>
        <div className="col-8">
          {/* Right sidebar -  */}
          {JSON.stringify(myFilters)}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
