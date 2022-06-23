import React from "react";

import CurrencyStore from "../../core/store/currency";

import styles from "./style.module.css";

export class SelectCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      currency: null,
    };
  }

  componentDidMount() {
    this.setState({ currency: CurrencyStore.getCurrency() });
  }

  toggleState = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  selectCurrency = (currency) => {
    this.setState({ currency, isOpened: false });
    CurrencyStore.setCurrency(currency);
  };

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
            <div className={styles.header_select_icon}></div>
          </div>
          {this.state.isOpened && (
            <div className={styles.header_select_list}>
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
