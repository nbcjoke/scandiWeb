import React from "react";

import { ChoiceSize } from "../../../components/choiceSize";
import { ChoiceColor } from "../../../components/choiceColor";

import sliderLeft from "../../../static/icons/sliderLeft.svg";
import styles from "../style.module.css";

export class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      amount: 1,
    };
  }

  previousImage() {
    let imageIndex = this.state.imageIndex;

    if (imageIndex === 0) {
      imageIndex = this.props.product.gallery.length - 1;
    } else {
      imageIndex--;
    }

    this.setState({ imageIndex });
  }

  nextImage() {
    let imageIndex = this.state.imageIndex;

    if (imageIndex === this.props.product.gallery.length - 1) {
      imageIndex = 0;
    } else {
      imageIndex++;
    }

    this.setState({ imageIndex });
  }

  handleAmountOnChange = (e) => {
    this.setState({ amount: e.target.value });
  };

  selectAttribute = (attribute, selectedValue) => {
    this.props.updateSelectedAttributes({
      ...this.props.product.selectedAttributes,
      [attribute.name]: selectedValue,
    });
  };

  render() {
    const product = this.props.product;
    return (
      <div className={styles.cart_item_wrapper}>
        <div className={styles.cart_item_container}>
          <h4 className={styles.cart_item_name}>{product.brand}</h4>
          <div className={styles.cart_item_view}>{product.name}</div>
          <div className={styles.cart_item_price}>
            {product.price.currency.symbol}
            {product.price.amount.toFixed(2)}
          </div>
          <div className={styles.cart_item_choise}>
            <div className={styles.cart_item_size}>
              {product.attributes?.map((attribute) => {
                return (
                  <>
                    {attribute.type === "text" ? (
                      <>
                        <p>{attribute.name}:</p>
                        <ChoiceSize
                          selected={product?.selectedAttributes[attribute.name]}
                          items={attribute.items}
                          select={this.selectAttribute.bind(this, attribute)}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </div>
            <div className={styles.cart_item_color}>
              {product.attributes?.map((attribute) => {
                return (
                  <>
                    {attribute.type === "swatch" ? (
                      <>
                        <p>{attribute.name}:</p>
                        <ChoiceColor
                          selected={product?.selectedAttributes[attribute.name]}
                          items={attribute.items}
                          select={this.selectAttribute.bind(this, attribute)}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.cart_wrapp}>
          <div className={styles.cart_quantity}>
            <button
              className={styles.cart_quantity_btn}
              onClick={() => this.props.increaseAmount(product)}
            >
              +
            </button>
            <input
              className={styles.cart_quantity_input}
              value={product.amount}
              onChange={this.handleAmountOnChange}
              type="text"
            />
            <button
              className={styles.cart_quantity_btn}
              onClick={() => this.props.decreaseAmount(product)}
            >
              -
            </button>
          </div>
          <div className={styles.cart_slider}>
            <img
              className={styles.cart_slider_img}
              src={product.gallery[this.state.imageIndex]}
              alt="product"
            />
            {product.gallery.length === 1 ? (
              ""
            ) : (
              <div className={styles.cart_slider_container}>
                <div
                  className={styles.cart_slider_btn}
                  onClick={this.previousImage.bind(this)}
                >
                  <img src={sliderLeft} alt="slider" />
                </div>
                <div
                  className={styles.cart_slider_btn}
                  onClick={this.nextImage.bind(this)}
                >
                  <img src={sliderLeft} alt="slider" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
