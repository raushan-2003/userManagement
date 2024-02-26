require('dotenv').config();
const connectToDb = require('../config/mongoConnection');

const database = process.env.DATABASE;
const collectionName = process.env.USERTABLE;

async function getUser() {
    let client;
    try {
        client = await connectToDb();
        let db = client.db(database);
        let collection = db.collection(collectionName);

        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(coll => coll.name === collectionName);

        if (!collectionExists) {
            return {
                statusCode: 404,
                body: { error: `Collection "${collectionName}" does not exist.` }
            };
        }

        let data = await collection.find({}).toArray();
        // await db.close();

        return {
            statusCode: 200,
            body: data
        };
    } catch (e) {
        console.log("Error Fetching User : ", e.message);
        return {
            statusCode: 500,
            body: e.message
        };
    } finally {
        if (client) {
            console.log("Monogo Connection closing");
            await client.close();
            console.log("Monogo Collection close");
        }

    }
}

// getUser().then((res) => {
//     if (res) {
//         console.log(res)
//     }
// })

module.exports = getUser; // Export the getUser function without calling it

