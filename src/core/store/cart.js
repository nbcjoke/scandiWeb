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

  addItemToCart: function addToCart(product) {
    const added = this.cartData.find(({ id }) => id === product.id);
    if (added) {
      added.amount++;
    } else {
      this.cartData.push({ ...product, amount: 1 });
    }
    this.emit("change");
  },

  removeItemFromCart: function removeFromCart(product) {
    const deleted = this.cartData.findIndex(({ id }) => id === product.id);
    this.cartData.splice(deleted, 1);
    this.emit("change");
  },

  increaseAmount: function increaseAmount(product) {
    const increase = this.cartData.find(({ id }) => id === product.id);
    if (!increase) {
      return;
    }
    increase.amount++;
    this.emit("change");
  },

  decreaseAmount: function decreaseAmount(product) {
    const increase = this.cartData.find(({ id }) => id === product.id);
    if (increase?.amount === 1) {
      return;
    }
    increase.amount--;
    this.emit("change");
  },

  updateCartProductSelections: function updateCartProductSelections(product) {
    const added = this.cartData.find(({ id }) => id === product.id);
    added.selectedAttributes = product.selectedAttributes;
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
