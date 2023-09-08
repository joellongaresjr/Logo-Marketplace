const { faker } = require('@faker-js/faker')
const db = require('../config/connection')
const { Category } = require('../models')



 const categorySeeds = async () => {
    await db.dropCollection('categories')
    
    const categories = []
    
    for (let i = 0; i < 10; i++) {
        const category = await Category.create({
        name: faker.commerce.department()
        })
        categories.push(category)
    }
    const uniqueCategories = [...new Set(categories)]

    for(const category of uniqueCategories) {
        await Category.create(category)
        console.log(`${category.name} created!`)
    }
 
}


module.exports = categorySeeds;
