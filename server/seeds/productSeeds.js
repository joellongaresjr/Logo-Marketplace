const { Category, Product, Store } = require("../models");
const { faker } = require("@faker-js/faker");

const productSeeds = async (amount) => {
  try {
    const products = [];
    const allCategories = await Category.find({});
    const allStores = await Store.find({});

    for (let i = 0; i < amount; i++) {
      const product = {
        name: faker.commerce.productName(),
        description: faker.lorem.sentences(),
        price: faker.commerce.price(),
        stockQuantity: faker.number.int({ min: 0, max: 100 }),
        imageUrl: faker.image.url({ width: 500, height: 500 }),
        category:
          allCategories[Math.floor(Math.random() * allCategories.length)],
        store: allStores[Math.floor(Math.random() * allStores.length)],
        featured: Math.random() < 0.3
      };
      products.push(product);
    }

    console.log("PRODUCTS CREATED\n-------------------");
    for (const product of products) {
      await Product.create(product);
    }
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};

module.exports = productSeeds;
