import React, { useState, useEffect } from "react";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { emptyCart } from "./cartHelpers";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import styles from "./Checkout.module.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  // State for holding data (token), error, and delivery address
  const [data, setData] = useState({
    loading:false,
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
        // if we set data as below, we always see the
        // success message dispalying on the cart page
        // setData({ ...data, clientToken: data.clientToken })
        // to prevent this, we omit the ...data
        setData({ clientToken: data.clientToken });
      }
    });
  };
  // Make request on component mounting
  // and state change
  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

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

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });
    // Send the nonce (payment method) to server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);

        // Once the component is mounted
        // the drop in instance is available
        // on data.instance
        nonce = data.nonce;

        // Once nonce (card type, card number)
        // is retrieved
        // send nonce as 'paymentMethodNonce'
        // and also total to be charged

        // console.log(
        //     "send nonce and total to process: ",
        //     nonce,
        //     getTotal(products)
        // );


        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            // create order
            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };

            createOrder(userId, token, createOrderData)
            .then((response) => {
              // empty cart
                emptyCart(() => {
                  setRun(!run); // run useEffect in parent Cart
                  console.log("payment success and empty cart");
                  setData({
                    loading: false,
                    success: true,
                  });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
         <div>
         <div className="gorm-group mb-3">
             <label className="text-muted">Delivery address:</label>
             <textarea
                 onChange={handleAddress}
                 className="form-control"
                 value={data.address}
                 placeholder="Type your delivery address here..."
             />
         </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault"
              }
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <Link  onClick={buy}>
          <AwesomeButton className={styles.awsBtn}>Checkout</AwesomeButton>
          </Link>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info mt-4"
      style={{ display: success ? "" : "none" }}
    >
      Thank you for your purchase. Your payment was successfully submitted.
    </div>
  );

  const showLoading = (loading) =>
    loading && <h2 className="text-danger">Loading...</h2>;

  return (
    <div>
      <h2 className={styles.h2Inner}>Total: ${getTotal()}</h2>

      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
