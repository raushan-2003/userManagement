require('dotenv').config();
const connectToDb = require('../config/mongoConnection');

const database = process.env.DATABASE;
const collectionName = process.env.OTPTABLE;

async function verifyOtp(email, otp) {
    let client;
    try {
        console.log("Verify OTP Function call");
        
        client = await connectToDb();
        const db = client.db(database);
        let collection = db.collection(collectionName);
        
        const userData = await collection.findOne({ "email": email });
        console.log("USER DATA : ", userData);
        
        if (!userData) {
            return {
                statusCode: 404,
                body: "Invalid Email Id"
            };
        }

        const currentTimestamp = Math.floor(Date.now() / 1000);
        console.log("userData.tstamp : ",userData.tstamp);
        console.log("currentTimestamp : ",currentTimestamp);
        console.log("userData.tstamp >= currentTimestamp : ",userData.tstamp >= currentTimestamp);
        if (userData.tstamp >= currentTimestamp) {
            if (otp == userData.otp) {
                return {
                    statusCode: 200,
                    body: "OTP Verified Successfully",
                    data: userData
                };
            } else {
                return {
                    statusCode: 400,
                    body: "Incorrect OTP"
                };
            }
        } else {
            return {
                statusCode: 400,
                body: "OTP Expired"
            };
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        if (client) {
            console.log("Monogo Connection closing");
            await client.close();
            console.log("Monogo Collection close");
        }

    }
}

module.exports = verifyOtp;

// Example usage:
// verifyOtp("singhraushan2003@gmail.com", "123456");
