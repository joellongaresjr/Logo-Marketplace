const categorySeeds = require('./categorySeeds');
const storeSeeds = require('./storeSeeds');
const userSeeds = require('./userSeeds');   
const productSeeds = require('./productSeeds');


const db = require('../config/connection');

db.once('open', async () => {
    try {
        await userSeeds();
        await categorySeeds();
        await storeSeeds();
        await productSeeds();
    }
    catch (err) {
        console.log(err);
} finally {
    process.exit(0);
}
});



    
