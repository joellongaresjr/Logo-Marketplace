const { Product, Category, Store, User, Order } = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
  Query: {
    getProduct: async (parent, { id }) => {
      return Product.findOne({ _id: id });
    },
    getProducts: async () => {
      const products = await Product.find().populate('category');
      const randomIndex = Math.floor(Math.random() * products.length);
      return [products[randomIndex]]; 
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
    // find user by username
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError('Not logged in');
    },
    // get all users
    users: async () => {
      return User.find();
    }
  
  },
  
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { username, email, password }) => {
      const user = await User.update({ username, email, password });
      const token = signToken(user);
      return { token, user };
    }
    ,
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if(!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if(!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
  },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = await Order.create({ products });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { orders: order._id } }
        );
        return order;
        } 
        throw AuthenticationError('You need to be logged in!');
    },
    addProduct: async (parent, { name, description, price, category, store, stockQuantity, imageUrl }) => {
      return Product.create({ name, description, price, category, store, stockQuantity, imageUrl });
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
      return Product.findOneAndUpdate({ _id }, { $inc: { stockQuantity: decrement } }, { new: true });
    },
    removeProduct: async (parent, { _id }, context) => {
      const product = await findOneAndDelete({ _id });
  },
    addCategory: async (parent, { name, description }) => {
      return Category.create({ name, description });
    },
    updateCategory: async (parent, { _id, name }) => {
      const decrement = Math.abs(quantity) * -1;
      return Category.findOneAndUpdate({ _id }, { $inc: { stockQuantity: decrement } }, { new: true });
    },
    removeCategory: async (parent, { _id }, context) => {
      const category = await findOneAndDelete({ _id });
  },
    addStore: async (parent, { name, location }) => {
      return Store.create({ name, location });
    },
    updateStore: async (parent, { _id, name }) => {
      const decrement = Math.abs(quantity) * -1;
      return Store.findOneAndUpdate({ _id }, { $inc: { stockQuantity: decrement } }, { new: true });
    },
    removeStore: async (parent, { _id }, context) => {
      const store = await findOneAndDelete({ _id });
  },
  }

};

module.exports = resolvers;
