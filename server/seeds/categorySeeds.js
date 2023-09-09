const { faker } = require("@faker-js/faker");
const { Category } = require("../models");

const categorySeeds = async (amount) => {
  const categories = [];

  for (let i = 0; i < amount; i++) {
    const category = await Category.create({
      name: faker.commerce.department(),
    });
    categories.push(category);
  }
  const uniqueCategories = [...new Set(categories)];

  for (const category of uniqueCategories) {
    await Category.create(category);
  }
  console.log("CATEGORIES CREATED\n-------------------");
};

module.exports = categorySeeds;
