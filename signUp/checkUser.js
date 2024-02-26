require('dotenv').config();
const connectToDb = require('../config/mongoConnection');

const database = process.env.DATABASE;
const collectionName = process.env.USERTABLE;

async function checkUser(email) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db(database);
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
    } finally {
        if (client) {
            console.log("Monogo Connection closing");
            await client.close();
            console.log("Monogo Collection close");
        }

    }
}

module.exports = checkUser;
