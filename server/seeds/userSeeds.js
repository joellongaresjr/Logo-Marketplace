const { User } = require("../models");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");


const userSeeds = async (amt) => {
  const users = [];

  for (let i = 0; i < amt; i++) {
    const user = await User.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: "password",
      address: faker.location.streetAddress(),

    });
    users.push(user);
  }

  const uniqueUsers = [...new Set(users)];

  for (const user of uniqueUsers) {
    await User.create(user);
  }
  console.log("USERS CREATED\n-------------------");

};

module.exports = userSeeds;
