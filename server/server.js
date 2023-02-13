const express = require('express');
const app = express();
let prodRoutes = require('./prodRoutes/routes');
require('dotenv').config();
let db = require('./ultils/connectDb');
const cors = require('cors');

let origin = ['http://localhost:3000']; 

// middleware
app.use(cors({ credentials: true, origin })); // this line allows us to get data from our react frontend
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use('/api/fool/products', prodRoutes);


// routes


// start server

let startServer =  async() => {
    try {
        let conn = await db();
        app.listen(process.env.PORT || 4000, () => {
        console.log('server started on port 4000!');
})
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

// start the server above
startServer(); 