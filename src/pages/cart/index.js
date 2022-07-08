import React from "react";

import { CartItem } from "./components/CartItem";
import CartStore from "../../core/store/cart";

import styles from "./style.module.css";

export class CartLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalQuantity: 0,
      cartProducts: [],
      totalPrice: 0,
      totalTax: 0.21,
    };
  }

  componentDidMount() {
    CartStore.addChangeListener(this._onChange);
    this._onChange();
  }

  componentWillUnmount() {
    CartStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    const cartProducts = CartStore.getCart();
    this.setState({ cartProducts });
  };

  removeItemFromCart(product) {
    CartStore.removeItemFromCart(product);
  }

  increaseAmount(product) {
    CartStore.increaseAmount(product);
  }

  decreaseAmount(product) {
    CartStore.decreaseAmount(product);
  }

  updateSelectedAttributes(index, attributes) {
    CartStore.updateCartProductSelections(index, attributes);
  }

  totalSymbol = () =>
    this.state.cartProducts[0]?.price?.currency?.symbol || "$";

  totalQuantity = () =>
    this.state.cartProducts.reduce((sum, product) => sum + product.amount, 0);

  productsPrice = () =>
    this.state.cartProducts.reduce(
      (sum, product) => sum + product.amount * product.price.amount,
      0
    );

  totalTax = () => {
    return (this.state.totalTax * this.productsPrice()).toFixed(2);
  };

  totalPrice = () => {
    return (this.productsPrice() + +this.totalTax()).toFixed(2);
  };

  render() {
    return (
      <div className={styles.cart_wrapper}>
        <h4 className={styles.cart_title}>Cart</h4>
        <div className={styles.cart_items_container}>
          {this.state.cartProducts?.map((product, index) => {
            return (
              <CartItem
                product={product}
                removeItemFromCart={this.removeItemFromCart}
                increaseAmount={this.increaseAmount}
                decreaseAmount={this.decreaseAmount}
                updateSelectedAttributes={this.updateSelectedAttributes.bind(
                  this,
                  index
                )}
              />
            );
          })}
        </div>
        <div className={styles.cart_order_information}>
          <div className={styles.cart_order_tax}>
            Tax 21%:
            <span>
              {this.totalSymbol()}
              {this.totalTax()}
            </span>
          </div>
          <div className={styles.cart_order_quantity}>
            Quantity:<span>{this.totalQuantity()}</span>
          </div>
          <div className={styles.cart_order_total}>
            Total:
            <span>
              {this.totalSymbol()}
              {this.totalPrice()}
            </span>
          </div>
          <button className={styles.cart_order_button}>ORDER</button>
        </div>
      </div>
    );
  }
}
