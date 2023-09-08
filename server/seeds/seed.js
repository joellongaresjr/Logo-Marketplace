const categorySeeds = require('./categorySeeds');
const storeSeeds = require('./storeSeeds');
const userSeeds = require('./userSeeds');   


const db = require('../config/connection');

db.once('open', async () => {
    try {
        await userSeeds();
        await categorySeeds();
        await storeSeeds();
    }
    catch (err) {
        console.log(err);
} finally {
    process.exit(0);
}
});



    
