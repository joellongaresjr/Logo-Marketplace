const { Category, Product, Store } = require('../models');
const { faker } = require('@faker-js/faker');
const db = require('../config/connection');

const productSeeds = async () => {
  try {
    await db.dropCollection('products');
  
    const products = [];
  
  
    const allCategories = await Category.find({});
    const allStores = await Store.find({});
  
    for (let i = 0; i < 10; i++) {
      const productName = faker.commerce.productName();
      const productDescription = faker.lorem.sentences();
      const productPrice = faker.commerce.price();
      const productStockQuantity = faker.number.int({ min: 0, max: 100 });
      const productImageUrl = faker.image.url({ width: 800, height: 600 });
      const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
      const randomStore = allStores[Math.floor(Math.random() * allStores.length)];
  
      const product = new Product({
        name: productName,
        description: productDescription,
        price: productPrice,
        stockQuantity: productStockQuantity,
        imageUrl: productImageUrl,
        category: randomCategory._id,
        store: randomStore._id,
      });
  
      await product.save();
      products.push(product);
    }
  
    console.log('PRODUCTS CREATED\n-------------------');
    for (const product of products) {
      console.log(`${product.name} created!`);
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

module.exports = productSeeds;


productSeeds();

