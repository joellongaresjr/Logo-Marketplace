const { faker } = require('@faker-js/faker')
const db = require('../config/connection')
const { Store } = require('../models')

const storeSeeds = async () => {
 
    try {  
        await db.dropCollection('stores')

        const stores = []

        for (let i = 0; i < 10; i++) {
            const store = await Store.create({
                name: faker.company.name(),
                location: faker.location.city(),  
            })
            stores.push(store)
        }
            const uniqueStores = [...new Set(stores)]

            console.log('STORES CREATED\n-------------------')
            for(const store of uniqueStores) {
                await Store.create(store)
                console.log(`${store.name} created!`)
            }

        } catch (err) {
            console.log(err);
    } finally {
        process.exit(0);

    }
}

module.exports = storeSeeds;

