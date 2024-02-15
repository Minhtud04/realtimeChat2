const dbConnect = require('./Database/dbConnection');
const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

//server-setup http://localhost:4000/api
const PORT = process.env.PORT || 4000;
const app = express('/api');
const backEndServer = http.createServer(app);
backEndServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
const DBserver = dbConnect();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Routes
const routeUser = require('./Routes/userRoute');
app.use('/user', routeUser);