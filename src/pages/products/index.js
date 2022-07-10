import React from "react";
import { useParams } from "react-router-dom";

import { ProductCard } from "./components/ProductCard";
import CategoriesStore from "../../core/store/categories";
import CartStore from "../../core/store/cart";
import CurrencyStore from "../../core/store/currency";
import { ProductService } from "../../core/services/product.service";

import styles from "./style.module.css";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
export class ProductsLayoutClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      products: [],
    };
  }

  componentDidMount() {
    CategoriesStore.selectCategory(this.props.params.category || "all");
    this.fetchProducts();
    CategoriesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CurrencyStore.removeChangeListener(this.currencyChanged);
    CategoriesStore.removeChangeListener(this._onChange);
  }

  currencyChanged = () => {
    const selectedCurrency = CurrencyStore.getCurrency();
    const products = this.state.products;
    this.setState({
      products: products?.map((product) => {
        return {
          ...product,
          price: product.prices.find(
            ({ currency }) => currency.label === selectedCurrency
          ),
        };
      }),
    });
  };

  fetchProducts = () => {
    const selectedCurrency = CurrencyStore.getCurrency();
    const category = CategoriesStore.getCategory();
    ProductService.fetchProducts(category).then((category) => {
      this.setState({
        category: category.name,
        products: category.products.map((product) => {
          return {
            ...product,
            price: product.prices.find(
              ({ currency }) => currency.label === selectedCurrency
            ),
            selectedAttributes: product.attributes.reduce(
              (prev, attribute) => ({
                ...prev,
                [attribute.name]: attribute.items[0].id,
              }),
              {}
            ),
          };
        }),
      });
      CurrencyStore.addChangeListener(this.currencyChanged);
    });
  };

  _onChange = () => {
    this.fetchProducts();
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
                  key={product.id}
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

export const ProductsLayout = withParams(ProductsLayoutClass);
