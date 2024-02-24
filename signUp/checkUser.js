const connectToDb = require('../config/mongoConnection');
const collectionName = "user";

async function checkUser(email) {
    try {
        const db = await connectToDb();
        const collection = db.collection(collectionName);
        
        let data = await collection.findOne({
            "email" : email
        });

        if (data) {
            return false; // User exists
        }
        return true; // User doesn't exist
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

module.exports = checkUser;
