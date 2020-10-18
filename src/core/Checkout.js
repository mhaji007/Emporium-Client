import React, { useState, useEffect } from "react";
import { getProducts, getBraintreeClientToken } from "./apiCore";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import styles from "./Checkout.module.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Checkout = ({ products }) => {
  // State for holding data (token), error, and delivery address
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    // Used for react
    // braintree drop in ui
    instance: {},
    address: "",
  });

  // Get user Id
  const userId = isAuthenticated() && isAuthenticated().user._id;
  // Get token
  const token = isAuthenticated() && isAuthenticated().token;

  // Make request to backend using userId and token
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ ...data, clientToken: data.clientToken });
      }
    });
  };
  // Make request on component mounting
  // and state change
  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
      <AwesomeButton className={styles.awsBtn}>
      Sign in to checkout
      </AwesomeButton>
      </Link>
    );
  };

  const showDropIn = () => (
    <div>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <AwesomeButton className={styles.awsBtn}>Checkout</AwesomeButton>
        </div>
      ) : null}
    </div>
  );

  return (
    <div>
      <h2 className={styles.h2Inner}>Total: ${getTotal()}</h2>

      {showCheckout()}
    </div>
  );
};

export default Checkout;
