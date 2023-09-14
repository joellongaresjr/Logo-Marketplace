const { Store } = require("../models");

const stores = [
  {
    name: "Bayani Delhi",
    location: "Long Beach",
    shopImageUrl: "store1"
  },
  {
    name: "Sunset Shack",
    location: "Daly City",
    shopImageUrl: "store2"
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
    console.log("No Seeds bitch");
  }
};

module.exports = { storeSeeds, stores } ;