const db = require("../config/connection");
const { Category, Store, User, Product, Admin } = require("../models");

const categorySeeds = require("./categorySeeds");
const storeSeeds = require("./storeSeeds");
const userSeeds = require("./userSeeds");
const productSeeds = require("./productSeeds");

//Change these values to change the amount of data seeded
const productAmount = 10;
const storeAmount = 100;
const categoryAmount = 10;
const userAmount = 10;
const dbCollections = [Category, Store, User, Product, Admin];

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
  console.log("ALL COLLECTIONS CREATED\n-------------------");
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
