const db = require("../config/connection");
const { Category, Store, User, Product } = require("../models");

const categorySeeds = require("./categorySeeds");
const storeSeeds = require("./storeSeeds");
const userSeeds = require("./userSeeds");
const productSeeds = require("./productSeeds");
const { create } = require("../models/Product");

//Change these values to change the amount of data seeded
const productAmount = 10000;
const storeAmount = 100;
const categoryAmount = 10;
const userAmount = 1000;
const dbCollections = [Category, Store, User, Product];

const resetCollections = async (collections) => {
  for (const col of collections) {
    if (!(await col.exists())) {
      await col.createCollection();
      console.log(
        `Collection was not found. Created ${col.modelName} collection`
      );
    } else {
      await col.collection.drop();
      await col.createCollection();
      console.log(`Dropped and Created ${col.modelName} collection`);
    }
    console.log("-------------------");
  }
  await createIndexes();
  console.log("ALL COLLECTIONS CREATED\n-------------------");
};

const createIndexes = async () => {
  await Product.createIndexes({ name: "text" });
  console.log("INDEXES CREATED\n-------------------");
};

db.once("open", async () => {
  try {
    await resetCollections(dbCollections);
    await userSeeds(userAmount);
    await categorySeeds(categoryAmount);
    await storeSeeds(storeAmount);
    await productSeeds(productAmount);
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(0);
  }
});
