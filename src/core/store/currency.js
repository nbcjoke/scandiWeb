import { EventEmitter } from "events";
import assign from "object-assign";

import CartStore from "./cart";

const CurrencyStore = assign({}, EventEmitter.prototype, {
  currency: "USD",

  getCurrency: function getCurrency(currency) {
    return this.currency;
  },

  setCurrency: function setCurrency(currency) {
    this.currency = currency;
    this.emit("change");
    CartStore.emitChange();
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

export default CurrencyStore;
