const { Schema, model } = require("mongoose");
const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
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