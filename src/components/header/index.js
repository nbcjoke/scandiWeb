import React from "react";
import { NavLink } from "react-router-dom";

import CartStore from "../../core/store/cart";
import CategoriesStore from "../../core/store/categories";
import CurrencyStore from "../../core/store/currency";
import { SelectCurrency } from "../selectCurrency";
import { CategoriesService } from "../../core/services/categories.service";

import styles from "./style.module.css";
import { ReactComponent as Logo } from "./../../static/icons/logo.svg";
import cart from "../../static/icons/cart.svg";
export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      cartProducts: [],
      currencies: [],
    };
  }

  fetchCategories = () => {
    CategoriesService.fetchCategories().then((result) => {
      CategoriesStore.setCategoriesData(result.data.categories);
      this.setState({
        categories: result.data.categories,
        currencies: result.data.currencies,
      });
    });
  };

  componentDidMount() {
    this.fetchCategories();
    CartStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CartStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    const cartProducts = CartStore.getCart();
    this.setState({ cartProducts });
  };

  selectCategory(category) {
    CategoriesStore.selectCategory(category);
    CategoriesStore.emitChange();
  }

  getCategory(category) {
    CategoriesStore.getCategory(category);
    CategoriesStore.emitChange();
  }

  setCurrency(event) {
    CurrencyStore.setCurrency(event.target.selectedOptions[0].value);
  }

  render() {
    return (
      <header>
        <div className={styles.header_wrapper}>
          <nav>
            <ul className={styles.header_list}>
              {this.state.categories.map((category) => (
                <li
                  key={category.name}
                  className={styles.header_item}
                  onClick={this.selectCategory.bind(this, category.name)}
                >
                  <NavLink
                    to={`/${category.name}`}
                    className={styles.header_link}
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.header_logo}>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>
          <div className={styles.header_information}>
            <SelectCurrency currencies={this.state.currencies} />
            <div className={styles.header_cart}>
              <NavLink to="/cart">
                <button className={styles.header_btn}>
                  <img src={cart} alt="cart" />
                </button>
                {this.state.cartProducts.length > 0 ? (
                  <p className={styles.header_cart_badge}>
                    {this.state.cartProducts.length}
                  </p>
                ) : (
                  ""
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
