require('dotenv').config();
const connectToDb = require('../config/mongoConnection');

const database = process.env.DATABASE;
const collectionName = process.env.OTPTABLE;

async function deleteOtp() {
    let client;
    try {
        client = await connectToDb();
        const db = client.db(database);
        const collection = db.collection(collectionName);

        const currentTimestamp = Math.floor(Date.now() / 1000);
        const fiveMinutesAgo = currentTimestamp - (5 * 60); 

        const filter = { tstamp: { $lt: fiveMinutesAgo } };
        
        const dataToDelete = await collection.find(filter).toArray();

        await collection.deleteMany(filter);
        console.log("Data to delete:", dataToDelete);

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }  finally {
        if (client) {
            console.log("Monogo Connection closing");
            await client.close();
            console.log("Monogo Collection close");
        }

    }
}

module.exports = deleteOtp;