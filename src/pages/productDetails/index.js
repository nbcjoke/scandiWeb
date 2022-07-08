import React from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import CartStore from "../../core/store/cart";
import CurrencyStore from "../../core/store/currency";
import { ProductService } from "../../core/services/product.service";
import { ChoiceSize } from "../../components/choiceSize";
import { ChoiceColor } from "../../components/choiceColor";

import styles from "./style.module.css";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export class ProductDetailsLayoutClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        selectedAttributes: {},
      },
      selectedImage: "",
    };
  }

  componentDidMount() {
    this.fetchProductById();
  }

  componentWillUnmount() {
    CurrencyStore.removeChangeListener(this.currencyChanged);
  }

  currencyChanged = (state) => {
    const selectedCurrency = CurrencyStore.getCurrency();
    state = state || this.state;
    const product = state.product;

    this.setState({
      ...state,
      product: {
        ...product,
        price: (product.prices || []).find(
          ({ currency }) => currency.label === selectedCurrency
        ),
      },
    });
  };

  fetchProductById = () => {
    ProductService.fetchProduct(this.props.params.productId).then((product) => {
      this.currencyChanged({
        product: {
          ...product,
          selectedAttributes: product.attributes.reduce(
            (prev, attribute) => ({
              ...prev,
              [attribute.name]: attribute.items[0].id,
            }),
            {}
          ),
        },
        selectedImage: product.gallery[0],
      });
      CurrencyStore.addChangeListener(this.currencyChanged);
    });
  };

  selectImage(image) {
    this.setState({ selectedImage: image });
  }

  addItemToCart(product) {
    CartStore.addItemToCart(product);
  }

  selectAttribute(attribute, selectedValue) {
    const product = this.state.product;
    this.setState({
      product: {
        ...product,
        selectedAttributes: {
          ...product.selectedAttributes,
          [attribute.name]: selectedValue,
        },
      },
    });
  }

  render() {
    const product = this.state.product;
    return (
      <div className={styles.details_wrapper}>
        <div className={styles.details_image_wrapper}>
          <div className={styles.details_image_container}>
            {product.gallery?.map((image) => {
              return (
                <img
                  className={styles.details_image}
                  src={image}
                  onClick={this.selectImage.bind(this, image)}
                  alt="product"
                />
              );
            })}
          </div>
          <div className={styles.details_main_container}>
            <img
              className={styles.details_main_image}
              src={this.state.selectedImage}
              alt="product"
            />
          </div>
        </div>
        <div className={styles.details_informanions_container}>
          <h4 className={styles.details_name}>{product.brand}</h4>
          <p className={styles.details_view}>{product.name}</p>
          <div className={styles.details_size_wrapper}>
            {product.attributes?.map((attribute) => {
              return (
                <>
                  {attribute.type === "text" ? (
                    <>
                      <p className={styles.details_title}>{attribute.name}:</p>
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
          <div className={styles.details_color_wrapper}>
            {product.attributes?.map((attribute) => {
              return (
                <>
                  {attribute.type === "swatch" ? (
                    <>
                      <p className={styles.details_title}>{attribute.name}:</p>
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
          <div className={styles.details_price_wrapper}>
            <p className={styles.details_title}>PRICE:</p>
            <p className={styles.details_price}>
              <span>{product.price?.currency?.symbol}</span>
              {product.price?.amount.toFixed(2)}
            </p>
          </div>
          {product.inStock ? (
            <button className={styles.details_button_inStock}>
              OUT OF STOCK
            </button>
          ) : (
            <button
              className={styles.details_button}
              onClick={() => this.addItemToCart(product)}
            >
              ADD TO CART
            </button>
          )}
          <div
            className={styles.details_description}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description),
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export const ProductDetailsLayout = withParams(ProductDetailsLayoutClass);
