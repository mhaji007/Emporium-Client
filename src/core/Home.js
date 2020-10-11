import React, {useState, useEffect} from "react";
import Layout from './Layout';
import {getProducts} from "./apiCore";
import Card from './Card';
import styles from './Home.module.css';

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

    <Layout title="Emporium" description="Browse. Shop. Enjoy. " className="container-fluid">

      <h2 className="mb-4">Best Sellers</h2>

      <div className={styles.customRow}>

      {productsBySell.map((product, i ) => (<Card key={i} product={product}/>))}

      </div>
      <h2 className="mb-4">New Arrivals</h2>

      <div className={styles.customRow}>
      {productsByArrival.map((product, i ) => (<Card key={i} product={product}/>))}
      </div>


    </Layout>
  )
};

export default Home;
