const categorySeeds = require('./categorySeeds');
const storeSeeds = require('./storeSeeds');

const db = require('../config/connection');

db.once('open', async () => {
    try {
        // await categorySeeds();
        await storeSeeds();
        console.log('categories seeded')
    }
    catch (err) {
        console.log(err);
} finally {
    process.exit(0);
}
});



    
