const { Schema, model } = require("mongoose");
const atlasPlugin = require("mongoose-atlas-search");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

productSchema.index({ name: "text" });

productSchema.virtual("orderCount").get(function () {
  return this.orders.length;
});

const Product = model("Product", productSchema);

atlasPlugin.initialize({
  model: Product,
  overwriteFind: true,
  searchKey: "search",
  searchFunction: (query) => {
    return {
      wildcard: {
        query: `${query}`,
        path: "name",
        allowAnalyzedField: true,
      },
    };
  },
});

module.exports = Product;
