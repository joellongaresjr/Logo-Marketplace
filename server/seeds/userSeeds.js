const { User } = require('../models');
const db = require('../config/connection');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const userSeeds = async () => {
    await db.dropCollection('users');
    
    const users = [];

    for (let i = 0; i < 10; i++) {
        const user = await User.create({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync("password", 10),
        })
        users.push(user);
    }

    const uniqueUsers = [...new Set(users)];

    for (const user of uniqueUsers) {
        await User.create(user);  
    }
    console.log("USERS CREATED\n-------------------");
}

module.exports = userSeeds;