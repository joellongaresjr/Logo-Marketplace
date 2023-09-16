const { Schema, model } = require("mongoose");
const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  currency: {
    type: String,
    default: "USD",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
const Order = model("Order", orderSchema);
module.exports = Order;