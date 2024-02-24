const connectToDb = require('./connection');

const collectionName = "user";

async function getUser() {
    try {
        let db = await connectToDb();
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
    }
}


module.exports = getUser; // Export the getUser function without calling it
