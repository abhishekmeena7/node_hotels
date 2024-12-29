const mongoose = require("mongoose");
require('dotenv').config();

//define monogDB connection url 

//local url
//const mongoUrl = MONGODB_URL_LOCAL//replace database with your database  name

//online url
const mongoUrl = process.env.MONGODB_URL;


//set up MONGODB connection
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,   //recommended to avoid warnings
    useUnifiedTopology: true  //recommended
})

//get the default connection
//mongoose maintains a default connection to the database

const db = mongoose.connection;

//bind event listener to the connection event

db.on('connected', () => {
    console.log('Connected to MongoDB');

})

db.on('error', () => {
    console.log('MongoDB connection error');

})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');

})

//export the database connection
module.exports = db;