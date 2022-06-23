import React from "react";

import { ProductCard } from "./components/ProductCard";
import CategoriesStore from "../../core/store/categories";
import CartStore from "../../core/store/cart";

import styles from "./style.module.css";

export class ProductsLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      products: [],
    };
  }

  componentDidMount() {
    CategoriesStore.addChangeListener(this._onChange);
    this._onChange();
  }

  componentWillUnmount() {
    CategoriesStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    const category = CategoriesStore.getCategory();
    const categoryData = CategoriesStore.getCategoryData(category);
    this.setState({ products: categoryData?.products, category });
  };

  addItemToCart(event, product) {
    event.stopPropagation();
    event.preventDefault();
    CartStore.addItemToCart(product);
  }

  render() {
    return (
      <div className={styles.products_wrapper}>
        <div className={styles.products_category_container}>
          <h2 className={styles.products_title}>{this.state.category}</h2>
          <div className={styles.products_card_wrapper}>
            {this.state?.products?.map((product) => {
              return (
                <ProductCard
                  product={product}
                  addItemToCart={this.addItemToCart}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
