const { get } = require("mongoose");
const { Product, Category, Store, User, Order, Admin } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    getProduct: async (parent, { id }) => {
      return Product.findOne({ _id: id });
    },
    getProducts: async () => {
      return Product.find().populate("category").populate("store");
    },
    getCategory: async (parent, { id }) => {
      return Category.findOne({ _id: id });
    },
    getCategories: async () => {
      const categories = await Category.find();
      return categories;
    },
    getStore: async (parent, { id }) => {
      return Store.findOne({ _id: id });
    },

    getStores: async () => {
      const stores = await Store.find();
      return stores;
    },

    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({
          path: "orders.products",
          populate: "category",
        });
      }
      throw AuthenticationError;
    },
    // get all users
    users: async () => {
      // populate with orders and the orders' products
      return User.find().populate({
        path: "orders.products",
        populate: "category",
      });
    },
    admin: async (parent, args, context) => {
      if (context.admin) {
        return Admin.findOne({ _id: context.admin._id }).populate({
          path: "orders.products",
          populate: "category",
        });
      }
      throw AuthenticationError;
    },
    admins: async () => {
      return Admin.find().populate("store");
    },
    orders: async () => {
      return Order.find();
    }

  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      console.log("tokens created");
      console.log("user added");
      return { token, user };
    },
    addAdmin: async (parent, args) => {
      console.log(args.store);
      const admin = await Admin.create(args);
      // console.log(admin);
      const token = signToken(admin);

      // console.log(admin._id);

      await Store.findByIdAndUpdate(args.store, {
        $addToSet: { admin: admin._id },
      });
      console.log("tokens created");

      console.log("admin added");
      return { token, admin };
    },

    updateUser: async (parent, { username, email, password }) => {
      const user = await User.update({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    addOrder: async (parent, args ) => {
        const products = args.products

        console.log(products)
        const order = await Order.create({ products });

        console.log(args.user)

        await User.findByIdAndUpdate(
          args.user,
          { $push: { orders: order } }
        );

        await Order.findByIdAndUpdate(
          order._id,
          { $push: { products: products }
        }
        );



        return order;

    },
    addProduct: async (
      parent,
      { name, description, price, category, store, stockQuantity, imageUrl },
      context
    ) => {
      const newProduct = await Product.create({
        name,
        description,
        price,
        category,
        store,
        stockQuantity,
        imageUrl,
      });

      await Category.findByIdAndUpdate(category, {
        $addToSet: { products: newProduct },
      });

      await Store.findByIdAndUpdate(store, {
        $addToSet: { products: newProduct },
      });

      return newProduct;
    },
    addStore: async (parent, args) => {
      const store = await Store.create(args);

      console.log(args.admin);
      console.log(store._id);

      await Store.findByIdAndUpdate(store._id, {
        $addToSet: { admin: args.admin },
      });

      await Admin.findByIdAndUpdate(args.admin, {
        $addToSet: { store: store._id },
      });

      return store;
    },

    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
      return Product.findOneAndUpdate(
        { _id },
        { $inc: { stockQuantity: decrement } },
        { new: true }
      );
    },
    removeProduct: async (parent, { _id }, context) => {
      const product = await findOneAndDelete({ _id });
    },
    addCategory: async (parent, { name, description }) => {
      return Category.create({ name, description });
    },
    updateCategory: async (parent, { _id, name }) => {
      const decrement = Math.abs(quantity) * -1;
      return Category.findOneAndUpdate(
        { _id },
        { $inc: { stockQuantity: decrement } },
        { new: true }
      );
    },
    removeCategory: async (parent, { _id }, context) => {
      const category = await findOneAndDelete({ _id });
    },

    updateStore: async (parent, { _id, name }) => {
      const decrement = Math.abs(quantity) * -1;
      return Store.findOneAndUpdate(
        { _id },
        { $inc: { stockQuantity: decrement } },
        { new: true }
      );
    },
    removeStore: async (parent, { _id }, context) => {
      const store = await findOneAndDelete({ _id });
    },
  },
};

module.exports = resolvers;
