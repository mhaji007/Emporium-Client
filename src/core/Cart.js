import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart, removeItem } from './cartHelpers';
import Card from './Card';
// import Checkout from './Checkout';
import styles from './Cart.module.css';
import Checkout from './Checkout';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h4 className={styles.h4Inner}>Your cart has {`${items.length}`} items</h4>
                <hr />
                <div className={styles.customRow}>

                {items.map((product, i) => (

                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        showPrice={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />

                ))}

                </div>
            </div>
        );
    };

    const noItemsMessage = () => (
        <h4 className={styles.h4Inner} >
           <p> Your cart is empty.</p> <br/> <Link to="/shop"><AwesomeButton className={styles.awsBtn}> Continue shopping  </AwesomeButton> </Link>
        </h4>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Add or remove items or continue shopping."
            className="container-fluid"
        >
            <div className={styles.customRow} >
                <div className="col-5">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

                <div className="col-7">
                    <h4 className="mb-4" className={styles.h4Inner}>Your cart summary</h4>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
