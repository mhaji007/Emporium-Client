import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import styles from "./Card.module.css";
import classnames from "classnames";
import {addItem, updateItem, removeItem} from './cartHelpers';

const showViewButton = (showViewProductButton) => {
  return (
    showViewProductButton && (
      <button
        className={classnames("btn btn-outline-primary mt mb-2", styles.btn)}
      >
        View Product
      </button>
    )
  );
};

const showStock = (quantity) => {
  return quantity > 0 ? (
    <span className="badge badge-primary badge-pill"> In Stock </span>
  ) : (
    <span className="badge badge-warning badge-pill"> Out of Stock</span>
  );
};




const Card = ({ product, showViewProductButton = true, showAddToCartButton=true, cartUpdate=false, showPrice=true, showRemoveProductButton=false, setRun = f => f,
  run = undefined} ) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const handleChange = (productId) => event => {
    setRun(!run);
    setCount(event.target.value <1 ? 1 : event.target.value)
    if(event.target.value >=1) {
      updateItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && <>
      <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
    </>
  }
  const addToCart = () => {
    addItem(product, () => {
    setRedirect(true);

    });
  }

const shouldRedirect = redirect => {
  if(redirect) {
    return <Redirect to="/cart"/>
  }
}

const showAddToCart = (showAddToCartButton) => {

  return showAddToCartButton? (
    <span onClick = {addToCart} className={styles.txt}>Add to cart</span>
  ): <span onClick = {addToCart} className={styles.txt}>{showCartUpdateOptions(cartUpdate)}</span>
}

const showPriceTag = (showPrice) => {
  return showPrice && <span className={styles.price}>${product.price}</span>
}
const showRemoveButton = (showRemoveProductButton) => {

  return showRemoveProductButton&& (
    <button onClick={() => {removeItem(product._id); setRun(!run);}} className="btn btn-outline-danger mt-2 mb-2">
      Remove Product
    </button>
  )
}


  return (
    // <div className={styles.dFlex}>
    // {/* <div className="col-2"> */}
    <div className={classnames(styles.container, styles.pageWrapper)}>
      <div className={styles.pageInner}>
        <div className={styles.row}>
          <div className={styles.elWrapper}>
            <div className={styles.boxUp}>
              <div className={styles.img}>
                <ShowImage item={product} url="product" />
              </div>
              <div className={styles.imgInfo}>
                <div className={styles.infoInner}>
                  <span className={styles.Pname}>
                    {shouldRedirect(redirect)}
                    {product.description.substring(0, 50)}
                  </span>
                  <span className={styles.pCompany}>
                    {showStock(product.quantity)}
                  </span>
                </div>
                <div className={styles.aSize}>
                  <span className={styles.size}>
                    <Link to={`/product/${product._id}`}>
                      {showViewButton(showViewProductButton)}
                    </Link>
                  </span>
                    <Link>
                      {showRemoveButton(showRemoveProductButton)}
                    </Link>
                </div>
              </div>
            </div>

            <div className={styles.boxDown}>
              <div className={styles.hBg}>
                <div className={styles.hBgInner}></div>
              </div>

              <a className={styles.cart}>
                {showPriceTag(showPrice)}
                <span className={styles.addToCart}>
                  {showAddToCart(showAddToCartButton)}
                </span>
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
    // {/* </div> */}
    // </div>
  );
};

export default Card;
