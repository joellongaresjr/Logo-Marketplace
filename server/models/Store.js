const { Schema, model } = require("mongoose");
const Product = require("./Product");

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  products: [Product.schema],
});

const Store = model("Store", storeSchema);

module.exports = Store;
