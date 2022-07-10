import { EventEmitter } from "events";
import assign from "object-assign";
import CurrencyStore from "./currency";

const CartStore = assign({}, EventEmitter.prototype, {
  cartData: [],

  getCart: function getCart() {
    const selectedCurrency = CurrencyStore.getCurrency();
    return this.cartData.map((product) => {
      return {
        ...product,
        price: product.prices.find(
          ({ currency }) => currency.label === selectedCurrency
        ),
      };
    });
  },

  getAddedProduct: function getAddedProduct(product) {
    return this.cartData.find(({ id, selectedAttributes }) => {
      return (
        id === product.id &&
        Object.keys(selectedAttributes).every(
          (key) => selectedAttributes[key] === product.selectedAttributes[key]
        )
      );
    });
  },

  addItemToCart: function addToCart(product) {
    const added = this.getAddedProduct(product);
    if (added) {
      added.amount++;
    } else {
      this.cartData.push({ ...product, amount: 1 });
    }
    this.emit("change");
  },

  increaseAmount: function increaseAmount(product) {
    const increase = this.getAddedProduct(product);
    if (!increase) {
      return;
    }
    increase.amount++;
    this.emit("change");
  },

  decreaseAmount: function decreaseAmount(product) {
    const decrease = this.getAddedProduct(product);
    if (decrease?.amount === 1) {
      const deleted = this.cartData.findIndex(
        ({ id, selectedAttributes }) =>
          id === product.id &&
          Object.keys(selectedAttributes).every(
            (key) => selectedAttributes[key] === product.selectedAttributes[key]
          )
      );
      this.cartData.splice(deleted, 1);
    }
    decrease.amount--;
    this.emit("change");
  },

  updateCartProductSelections: function updateCartProductSelections(
    index,
    attributes
  ) {
    let added = this.cartData[index];
    if (!added) {
      return;
    }
    added = { ...added, selectedAttributes: attributes };
    const productWithSameAttributes = this.getAddedProduct(added);
    if (productWithSameAttributes) {
      productWithSameAttributes.amount += added.amount;
      this.cartData.splice(index, 1);
    } else {
      this.cartData.splice(index, 1, added);
    }
    this.emit("change");
  },

  emitChange: function emitChange() {
    this.emit("change");
  },

  addChangeListener: function addChangeListener(callback) {
    this.on("change", callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener("change", callback);
  },
});

export default CartStore;
