const connectToDb = require('../config/mongoConnection');
const collectionName = "otp_table";


async function deleteOtp() {
    try {
        const db = await connectToDb();
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
    }
}

module.exports = deleteOtp;