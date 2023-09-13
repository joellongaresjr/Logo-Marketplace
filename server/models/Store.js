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
  shopImageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  products: [Product.schema],
  admin: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  }

});

const Store = model("Store", storeSchema);

module.exports = Store;
