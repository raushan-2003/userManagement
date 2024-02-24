const express = require('express');
const envVariable = require('dotenv').config();
const app = express();
// const getUser = require('./getUser');
const signUp = require('./signUp/index');
const verify = require('./verifyOtp/index');

console.log("Env Variable : ",process.env.PORT);

// Middleware to parse JSON request body
app.use(express.json());

// app.get('/getUser', async (req, res) => {
//     try {
//         const data = await getUser();
//         res.status(data.statusCode).json(data.body);
//     } catch (e) {
//         res.status(500).send({ body: e.message });
//     }
// });

app.post('/signUp', async (req, res) => {
    try {
        console.log(req.body); // Access request body using req.body
        const data = await signUp(req.body);

        res.status(data.statusCode).json(data.body);
    } catch (e) {
        res.status(500).send({ body: e.message });
    } 
});

app.post('/verifyOtp', async (req, res) => {
    try {
        console.log("Verify Request : ", req.body);
        const data = await verify(req.body);  

        res.status(data.statusCode).json(data.body); 
    } catch (e) {
        res.status(500).send({ body: e.message });
    }
}); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
