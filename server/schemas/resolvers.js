const { get } = require("mongoose");
const { Product, Category, Store, User, Order, Admin } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    getProduct: async (parent, { _id }) => {
      return Product.findOne({ _id });
    },
    getProducts: async (parent, { limit, offset }) => {
      const paginatedProducts = await Product.find({ featured: true })
        .limit(limit)
        .skip(offset)
        .populate("category")
        .exec();
      return paginatedProducts;
    },
    getProductsFuzzy: async (_, { query }) => {
      try {
        const result = await Product.find({
          name: { $regex: query, $options: "i" },
        });
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    getFeaturedProducts: async () => {
      return Product.find({ featured: true }).populate("category");
    },
    getCategory: async (parent, { id }) => {
      return Category.findOne({ _id: id });
    },
    getCategories: async () => {
      const categories = await Category.find();
      return categories;
    },
    getProductsByCategory: async (parent, _id) => {
      console.log(_id);
      const result = await Product.find({ category: _id }).populate("category");
      console.log(result);
      return result;
    },

    getStore: async (parent, { id }) => {
      return Store.findOne({ _id: id });
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;

      const order = new Order({ products: args.products });

      const { products } = await order.populate("products");

      const line_items = [];

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd", 
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      console.log(session);
      return { session: session.id };
    },

    getStores: async () => {
      const stores = await Store.find().populate("products");
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
    users: async () => {
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
      return Order.find().populate("products");
    },

    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate({
          path: "orders.products",
          populate: "category",
        });
        return user.orders.id(_id);
      }
      throw AuthenticationError;
    },
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

      const token = signToken(admin);

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
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = await Order({ products });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        console.log("order added");
        return order;
      }
      throw AuthenticationError;
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
