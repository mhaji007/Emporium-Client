import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart, removeItem } from './cartHelpers';
import Card from './Card';
// import Checkout from './Checkout';
import styles from './Cart.module.css';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2 className={styles.h4Inner}>Your cart has {`${items.length}`} items</h2>
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
        <h4 className={styles.h4Inner}>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h4>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Add or remove items or continue shopping."
            className="container-fluid"
        >
            <div className={styles.customRow} >
                <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

                <div className="col-6">
                    <h2 className="mb-4" className={styles.h4Inner}>Your cart summary</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
