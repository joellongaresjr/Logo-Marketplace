const { Product, Category, Store } = require('../models');

const resolvers = {
  Query: {
    getProduct: async (parent, { id }) => {
      return Product.findOne({ _id: id });
    },
    getProducts: async () => {
      return Product.find();
    },
    getCategory: async (parent, { id }) => {
      return Category.findOne({ _id: id });
    },
    getCategories: async () => {
      return Category.find();
    },
    getStore: async (parent, { id }) => {
      return Store.findOne({ _id: id });
    },
    getStores: async () => {
      return Store.find();
    },
  },

  Product: {
    category: async (product) => {
      return Category.findOne({ _id: product.category });
    },
    store: async (product) => {
      return Store.findOne({ _id: product.store });
    },
  },
};

module.exports = resolvers;
