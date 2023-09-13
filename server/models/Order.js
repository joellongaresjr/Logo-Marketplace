const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  products: [Array],
});

const Order = model("Order", orderSchema);

module.exports = Order;