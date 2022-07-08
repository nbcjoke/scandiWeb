import { EventEmitter } from "events";
import assign from "object-assign";

import CurrencyStore from "./currency";

const CategoriesStore = assign({}, EventEmitter.prototype, {
  category: "",
  categoriesData: [],

  getCategoryData: function getCategoryData(selectedCategory) {
    const category = this.categoriesData.find(
      ({ name }) => name === selectedCategory
    );
    if (!category) {
      return;
    }
    const selectedCurrency = CurrencyStore.getCurrency();
    return {
      ...category,
      products: category.products.map((product) => {
        return {
          ...product,
          price: product.prices.find(
            ({ currency }) => currency.label === selectedCurrency
          ),
        };
      }),
    };
  },

  getCategory: function getCategory(category) {
    return this.category;
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

  selectCategory: function selectCategory(category) {
    this.category = category;
  },

  setCategoriesData: function setCategoriesData(categories) {
    this.categoriesData = categories;
  },
});

export default CategoriesStore;
