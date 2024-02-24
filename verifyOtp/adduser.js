const connectToDb = require('../config/mongoConnection');
const collectionName = "user";

async function addUser(userData) {
    try {
        const db = await connectToDb();
        const collection = db.collection("user");

        const query = {
            email: userData.email,
            name: userData.name,
        };
        await collection.insertOne(query);
        
        return true; 
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

module.exports = addUser;