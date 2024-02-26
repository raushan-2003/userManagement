require('dotenv').config();

const { MongoClient } = require('mongodb');

const uri = process.env.URI;
const client = new MongoClient(uri);

// const database = process.env.DATABASE;

console.log("Connection Start");

async function main() {
    try {
        return await client.connect();
        // await client.connect();
        // console.log("Connected to MongoDB");
        // return client.db(database);

    } catch (err) {
        console.log("Failed to connect MongoDB : ", err.message);
        process.exit(1);
    }
}
main();
module.exports = main; // Exporting the function itself, not its result