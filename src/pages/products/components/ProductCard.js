import React from "react";
import { NavLink } from "react-router-dom";

import styles from "../style.module.css";
import productCart from "../../../static/icons/products-cart.svg";

export class ProductCard extends React.Component {
  render() {
    const product = this.props.product;
    return (
      <div
        className={
          styles.products_card +
          " " +
          (product.inStock ? styles.out_of_stock : "")
        }
      >
        <NavLink
          to={`/products/${product.id}`}
          className={styles.products_link}
        >
          <div className={styles.products_card_img_container}>
            <img
              className={styles.products_card_img}
              src={product.gallery[0]}
              alt="product"
              onError={(event) => (event.target.style.visibility = "hidden")}
            />
          </div>
          <div className={styles.products_card_background}></div>
          <p className={styles.products_card_inStock}>out of stock</p>
          <div className={styles.products_cart}>
            <button
              onClick={(event) => this.props.addItemToCart(event, product)}
            >
              <img src={productCart} alt="cart" />
            </button>
          </div>
          <div className={styles.products_card_information}>
            <h4 className={styles.products_card_name}>
              {product.brand}
              <span className={styles.products_card_view}>{product.name}</span>
            </h4>
            <p className={styles.products_card_cost}>
              <span>{product.price?.currency?.symbol}</span>
              {product.price?.amount.toFixed(2)}
            </p>
          </div>
        </NavLink>
      </div>
    );
  }
}
