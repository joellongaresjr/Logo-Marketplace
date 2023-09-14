const { Store } = require("../models");

const stores = [
  {
    name: "Bayani Delhi",
    location: "Houston, Texas",
    shopImageUrl: "store1",
    description: "A Filipino deli in Texas offering a vibrant taste of the Philippines right in the heart of the Lone Star State."
  },
  {
    name: "Sunset Shack",
    location: "New York, Brooklyn",
    shopImageUrl: "store2",
    description: "Sunset Shack, the Filipino bakery that supplies fresh goods and services from the Big Apple"
  },
];

const storeSeeds = async (storeDataAraay) => {
  try {
    for (const storeData of storeDataAraay) {
      const store = new Store(storeData);
      await store.save();
    }

    console.log("Stores saved successfully");
  } catch (err) {
    console.log("No Seeds");
  }
};

module.exports = { storeSeeds, stores } ;