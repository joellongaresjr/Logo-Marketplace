const { faker } = require("@faker-js/faker");
const { Category } = require("../models");

const categorySeeds = async (amount) => {
  const categoryNames = new Set();

  for (let i = 0; i < amount; i++) {
    let categoryName;
    do {
      categoryName = faker.commerce.department();
    } while (categoryNames.has(categoryName));

    categoryNames.add(categoryName); 

    await Category.create({
      name: categoryName,
    });
  }

  console.log("CATEGORIES CREATED\n-------------------");
};

module.exports = categorySeeds;
