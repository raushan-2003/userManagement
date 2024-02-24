const verifyOtp = require('./verifyOtp');
const deleteOtp = require('./deleteOtp');
const addUser = require('./adduser');

async function main (req){
    try{
        console.log("Verify OTP Index Request : ", req);

        if (!req || !req.email || !req.otp) {
            return {
                statusCode: 400,
                body: "Invalid request: Email and OTP are required."
            };
        }

        let verify = await verifyOtp(req.email,req.otp);
        console.log("VERIFY STATUS : ",verify);
        await deleteOtp();

        if (verify.statusCode === 200) {
            const userData = verify.data;
            const userAdded = await addUser(userData);
            if (userAdded) {
                console.log("SucessFull");
                return verify;
            } else {
                throw new Error("Failed to add user.");
            }
        } else {
            return verify;
        }


    }catch(e){
        return{
            statusCode : 500,
            body : e.message
        }
    }
}

module.exports = main;