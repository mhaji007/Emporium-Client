import React, {useState, useEffect} from "react";
import Layout from './Layout';
import {getProducts} from "./apiCore";
import Card from './Card';
import classnames from "classnames";
import styles from './Home.module.css';
import SplitText from 'react-pose-text';
import Search from "./Search"


const Home = () =>
{
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if(data.error) {
        console.log(error);
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

  const charPoses = {
    exit: { opacity: 0, y: 20 },
    enter: {
      opacity: 1,
      y: 0,
      delay: ({ charIndex }) => charIndex * 30
    }
  };



  return (

  <Layout title="Emporium" description={<SplitText initialPose="exit" pose="enter" charPoses={charPoses}>Browse. Shop. Enjoy.</SplitText>} className="container-fluid">

      <Search/>
      <h4 className={classnames("mb-4", styles.h4Inner)}>Best Sellers</h4>

      <div  className={styles.customRow}>

      {productsBySell.map((product, i ) => (<Card key={i} product={product}/>))}

      </div>


      <h4 className={classnames("mb-4", styles.h4Inner)}>New Arrivals</h4>

      <div className={styles.customRow}>
      {productsByArrival.map((product, i ) => (<Card key={i} product={product}/>))}
      </div>


    </Layout>
  )
};

export default Home;
