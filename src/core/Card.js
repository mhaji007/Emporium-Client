import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import styles from "./Card.module.css";
import classnames from "classnames";

const Card = ({ product }) => {
  return (
    // <div className={styles.dFlex}>
    // {/* <div className="col-2"> */}
    <div className={classnames(styles.container, styles.pageWrapper)}>
      <div className={styles.pageInner}>
        <div className={styles.row}>
          <div className={styles.elWrapper}>
            <div className={styles.boxUp}>
            <div className={styles.img}>

              <ShowImage item = {product} url="product"/>
            </div>
              <div className={styles.imgInfo}>
                <div className={styles.infoInner}>
                  <span className={styles.Pname}>{product.description}</span>
                  <span className={styles.pCompany}>Yeezy</span>
                </div>
                <div className={styles.aSize}>
                  <span className={styles.size}>
                    <Link to="/">
                      <button className="btn btn-outline-primary mt mb-2">
                        View Product
                      </button>
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.boxDown}>
              <div className={styles.hBg}>
                <div className={styles.hBgInner}></div>
              </div>

              <a className={styles.cart} href="#">
                <span className={styles.price}>{product.price}</span>
                <span className={styles.addToCart}>
                  <span className={styles.txt}>Add to cart</span>
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
