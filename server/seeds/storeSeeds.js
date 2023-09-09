const { faker } = require("@faker-js/faker");
const { Store } = require("../models");

const storeSeeds = async (amount) => {
  try {
    const stores = [];

    for (let i = 0; i < amount; i++) {
      const store = await Store.create({
        name: faker.company.name(),
        location: faker.location.city(),
      });
      stores.push(store);
    }
    const uniqueStores = [...new Set(stores)];

    for (const store of uniqueStores) {
      await Store.create(store);
    }
    console.log("STORES CREATED\n-------------------");
  } catch (err) {
    console.log(err);
  }
};

module.exports = storeSeeds;
