require('dotenv').config();

const express = require('express');
const app = express();
const getUser = require('./getUser/getUser');
const signUp = require('./signUp/index');
const verify = require('./verifyOtp/index');

console.log("Env Variable : ", process.env.PORT); // Log the value of PORT from environment variables if set

const port = process.env.PORT || 3700; // Set port to PORT environment variable or fallback to 3000

console.log("PORT : ", port); // Log the value of port (either PORT environment variable or 3000 fallback)

// Middleware to parse JSON request body
app.use(express.json());

app.get('/getUser', async (req, res) => { 
    try {
        const data = await getUser();
        res.status(data.statusCode).json(data.body);
    } catch (e) {
        res.status(500).send({ body: e.message });
    }
});

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

console.log(port); // Log the final value of port (either PORT environment variable or 3000 fallback)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
