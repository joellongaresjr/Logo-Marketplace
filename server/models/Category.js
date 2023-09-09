const { Schema, model } = require("mongoose");
const Product = require("./Product");


const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: [Product.schema]

});

const Category = model("Category", categorySchema);

module.exports = Category;
