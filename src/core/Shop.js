import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

// Component that sends request to backend
// and displays products based on filters
const Shop = () => {
  // State for storing category ids and price
  // range that is selected based on user interaction
  // the values for each array comes from Checkbox
  // and RadioBox respectively (intially empty)
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  // State holding all categories
  // to be shown on the left sidebar
  // The category list is passed to
  // checkBox component as a prop.
  // After being fetched down below
  // categoy array is iterated over in
  // checkBox and displayed on
  // the UI

  // Since price range is imported
  // from an external file (hardcoded)
  // there is no need for a price
  // range state here
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);


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

  const loadFilteredResults = newFilters => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setFilteredResults(data.data);
        }
    });
};

  // This method is passed to both checkBox and
  // RadioBox component. filters is an object
  // containing either an array of categoryIds or a price range id
  // filters' value is coming from the changed state
  // of either checkBox or RadioBox
  // filterBy is either price or category passed as
  // a string argument when handleFilters in passed
  // down to check
  const handleFilters = (filters, filterBy) => {

     console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    // Update filters with price
    newFilters.filters[filterBy] = filters;
    // Extract array value out of the key
    if (filterBy == "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };
  // value is the selected radio button's id
  const handlePrice = (value) => {

    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters)
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
          <h4>Filter by price range</h4>
          <div>
            {/* Pass price rangw and handleFilters to RadioBox */}
            {
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            }
          </div>
        </div>
        <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            
                                <Card key={i}  product={product} />

                        ))}
                    </div>
                    <hr />
                    {/* {loadMoreButton()} */}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
