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

  Mutations: {
    addProduct: async (parent, args) => {
      const product = await Product.create(args);
      return product;
    },
    addCategory: async (parent, args) => {
      const category = await Category.create(args);
      return category;
    },
    addStore: async (parent, args) => {
      const store = await Store.create(args);
      return store;
    },
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    addToCart: async (parent, { userId, productId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { cart: productId } },
        { new: true }
      ).populate("cart");
      return updatedUser;
    }
  },
};

module.exports = resolvers;
