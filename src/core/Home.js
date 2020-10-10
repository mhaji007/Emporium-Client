import React, {useState, useEffect} from "react";
import Layout from './Layout';
import {getProducts} from "./apiCore";

const Home = () =>
{
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    })
  }

  const loadProductsByArrival= () => {
    getProducts('createdAt').then(data => {
      if(data.error) {
        setError(error);
      } else {
        setProductsByArrival(data);
      }
    })
  }

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();

  }, [])


  return (
    <Layout title="Homepage" description="Emporium App">
      {JSON.stringify(productsByArrival)}
      <hr/>
      {JSON.stringify(productsBySell)}
    </Layout>
  )
};

export default Home;
