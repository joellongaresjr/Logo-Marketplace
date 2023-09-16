const { Product, Category, Store, User, Order, Admin } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    // get individual product by id
    getProduct: async (parent, { _id }) => {
      return Product.findOne({ _id });
    },
    // get all products
    getProducts: async (parent, { limit, offset }) => {
      const paginatedProducts = await Product.find({ featured: true })
        .limit(limit)
        .skip(offset)
        .populate("category")
        .exec();
      return paginatedProducts;
    },
    // get all products by search query (fuzzy search) which is a string that is a partial match of a word or phrase
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
    // get all products by category
    getCategories: async () => {
      const categories = await Category.find();
      return categories;
    },
    // get all products by category
    getProductsByCategory: async (parent, _id) => {
      console.log(_id);
      const result = await Product.find({ category: _id }).populate("category");
      return result;
    },
    // checkout that links the user to stripe checkout and creates an order to render on that page 
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      console.log("here");

      const order = new Order({ products: args.products });

      const { products } = await order.populate("products");

      const currency = args.currency;

      const convertedAmounts = args.convertedAmounts;
  
      const line_items = [];
      // loop over products and create line items for stripe session
      for (let i = 0; i < products.length; i++) {
        if (currency !== "USD") {
          products[i].price = convertedAmounts[i];
        }

        
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });


          const price = await stripe.prices.create({
            product: product.id,
            unit_amount:(products[i].price * 100.00).toFixed(0),
            currency: currency,
          });

        line_items.push({
          price: price.id,
          quantity: 1,
        });

      }
      // create checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    // get all stores (future feature)
    getStores: async () => {
      const stores = await Store.find().populate("products");
      return stores;
    },
    // get individual store by id (future feature)
    getStore: async (parent, { id }) => {
      return Store.findOne({ _id: id });
    },
    // get all an individual user's orders with populated products
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({
          path: "orders.products",
          populate: "category",
        });
      }
      throw AuthenticationError;
    },
    // get all users and order products to check if they are stored in the db
    users: async () => {
      return User.find().populate({
        path: "orders.products",
        populate: "category",
      });
    },
  },

  Mutation: {
    // add a user to the db and create a token for them
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      console.log("tokens created");
      console.log("user added");
      return { token, user };
    },
    // login a user and create a token for them
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      // check if password is correct
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    // add a store to the db and add the admin to the store (future feature)
    addStore: async (parent, args) => {
      const store = await Store.create(args);
      await Store.findByIdAndUpdate(store._id, {
        $addToSet: { admin: args.admin },
      });

      await Admin.findByIdAndUpdate(args.admin, {
        $addToSet: { store: store._id },
      });

      return store;
    },
    // update a product's stock quantity
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
      return Product.findOneAndUpdate(
        { _id },
        { $inc: { stockQuantity: decrement } },
        { new: true }
      );
    },
    // add an order to the db and add it to the user's orders
    addOrder: async (parent, { products, currency }, context) => {
      if(context.user) {

        const order = await Order({ products, currency }); 
        console.log(order);
         // update the user's orders by adding the order to the orders array
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        await Order.findByIdAndUpdate(order._id, {
          $set: { currency: currency },
        });

        console.log("order added");
        return order;
      }
      throw AuthenticationError;
    },
  }
}

module.exports = resolvers;
