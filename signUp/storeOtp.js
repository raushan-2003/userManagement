require('dotenv').config();
const e = require('express');
const connectToDb = require('../config/mongoConnection');
const sendMail = require('./sendMail');

const database = process.env.DATABASE;
const collectionName = process.env.OTPTABLE;

async function storeOtp(name,email){
    let client;
    try{
        client = await connectToDb();
        const db = client.db(database);
        const collection = db.collection(collectionName);

        const otp = Math.floor(Math.random() * 9000) + 1000;
        let tstamp = Math.floor(Date.now() / 1000);
        console.log("tstam : ",tstamp)
        tstamp = tstamp + (5 * 60);
        console.log("After 5 min : ",tstamp);

        let params = {
            "email": email,
            "otp": otp,
            "name" : name,
            "tstamp" : tstamp 
        };

        await collection.insertOne(params);
        await sendMail(name,email,otp);
        return true;
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

module.exports = storeOtp;
// const connectToDb = require('../config/mongoConnection');
// const collectionName = "otp_table";

// async function storeOtp(name, email) {
//     let db;
//     try {
//         db = await connectToDb();
//         const collection = db.collection(collectionName);

//         const otp = Math.floor(Math.random() * 9000) + 1000;
//         let tstamp = Math.floor(Date.now() / 1000);
//         console.log("tstam : ", tstamp);
//         tstamp = tstamp + (5 * 60);
//         console.log("After 5 min : ", tstamp);

//         let params = {
//             "email": email,
//             "otp": otp,
//             "name": name,
//             "tstamp": tstamp
//         };

//         await collection.insertOne(params);
//         return true;
//     } catch (error) {
//         console.error('Error:', error.message);
//         throw error;
//     } finally {
//         if (db) {
//             try {
//                 await db.close(); // Close the MongoDB connection
//                 console.log("MongoDB connection closed.");
//             } catch (error) {
//                 console.error('Error closing connection:', error.message);
//             }
//         }
//     }
// }

// module.exports = storeOtp;
