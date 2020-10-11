import React, {useState, useEffect} from "react";
import Layout from './Layout';
import Card from './Card';
import {getCategories} from "./apiCore";
import Checkbox from './Checkbox';

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
          {<Checkbox categories={categories}/>}
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
