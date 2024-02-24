const { MongoClient } = require('mongodb');

const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);

const database = "usermanagement";

console.log("Connection Start");

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(database);

    } catch (err) {
        console.log("Failed to connect MongoDB : ", err.message);
        process.exit(1);
    }
}
// main();
module.exports = main; // Exporting the function itself, not its result