import React from "react";

import CurrencyStore from "../../core/store/currency";

import styles from "./style.module.css";
import currencySwitcher from "../../static/icons/currency-switcher.svg";

export class SelectCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      currency: null,
    };

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.setState({ currency: CurrencyStore.getCurrency() });
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  toggleState = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  selectCurrency = (currency) => {
    this.setState({ currency, isOpened: false });
    CurrencyStore.setCurrency(currency);
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current?.contains(event.target)) {
      this.setState({ isOpened: false });
    }
  }

  render() {
    const currency = this.props.currencies.find(
      ({ label }) => label === this.state.currency
    );
    return (
      <>
        <div className={styles.header_select}>
          <div
            className={styles.header_select_wrapper}
            onClick={this.toggleState}
          >
            <span className={styles.header_select_current}>
              {currency?.symbol}
            </span>
            <div
              className={
                !this.state.isOpened
                  ? styles.header_select_icon
                  : styles.select_icon_reverse
              }
            >
              <img src={currencySwitcher} alt="currency Switcher" />
            </div>
          </div>
          {this.state.isOpened && (
            <div className={styles.header_select_list} ref={this.wrapperRef}>
              {this.props.currencies.map((currency) => {
                return (
                  <div
                    className={styles.header_select_item}
                    onClick={() => this.selectCurrency(currency.label)}
                    key={currency.label}
                  >
                    {currency.symbol} {currency.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  }
}
