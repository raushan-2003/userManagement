require('dotenv').config();
const connectToDb = require('../config/mongoConnection');

const database = process.env.DATABASE;
const collectionName = process.env.USERTABLE;

async function addUser(userData) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db(database);
        const collection = db.collection(collectionName);

        const query = {
            email: userData.email,
            name: userData.name,
        };
        await collection.insertOne(query);
        
        return true; 
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    } finally {
        if (client) {
            console.log("Monogo Connection closing");
            await client.close();
            console.log("Monogo Collection close");
        }

    }
}

module.exports = addUser;