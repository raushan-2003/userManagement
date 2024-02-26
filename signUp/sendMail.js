require('dotenv').config();
const nodemailer = require('nodemailer');

let userMail = process.env.USERMAIL;
let password = process.env.PASS;

console.log("User Mail : ",userMail);
console.log("Password : ",password);

async function sendMail(name,email,otp) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: userMail, // Sender email address
                pass: password  // Sender email password
            }
        });

        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
        const mailOptions = {
            from: `Raushan Singh<${userMail}>`, // Sender email address
            to: email, // Recipient email address
            subject: 'Email Verification OTP', // Email subject
            html: `<div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; background-color: #f4f4f4;">
            <h2 style="color: #333; margin-bottom: 20px;">OTP Verification</h2>
            <p style="color: #666; margin-bottom: 20px;">Dear ${capitalizedName},</p>
            <p style="color: #666; margin-bottom: 20px;">Your One-Time Password (OTP) for verification is:</p>
            <p style="color: #333; font-size: 24px; margin-bottom: 20px;">${otp}</p>
            <p style="color: #666; margin-bottom: 20px;">This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
            <p style="color: #666; margin-bottom: 20px;">If you did not request this OTP, please ignore this email.</p>
            <p style="color: #666; margin-bottom: 20px;">Best Regards,<br/>Your Company Name</p>
        </div>
        ` // Email body with OTP
        };

        const info = await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error('Error sending email:', error);
                    reject(error); // Reject the promise with the error
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(info.response); // Resolve the promise with the response
                }
            });
        });

        return info; // Return the info response
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Throw the error to be caught by the caller
    }
}

// sendMail("raushan singh","raushansinghd2003@gmail.com",5642);

module.exports = sendMail;