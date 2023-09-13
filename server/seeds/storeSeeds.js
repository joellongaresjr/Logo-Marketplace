const { Store } = require("../models");

const stores = [
  {
    name: "Bayani Delhi",
    location: "Long Beach",
    shopImageUrl: "/assets/images/BayaniDelhi.png" 
  },
  {
    name: "Sunset Shack",
    location: "Daly City",
    shopImageUrl: "/assets/images/SunsetShack.png" 
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