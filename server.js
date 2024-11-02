const express = require("express");
const app = express();
const {MongoClient} = require('mongodb');
const mongodb = require("./db/connect");
const dotenv = require("dotenv");
dotenv.config();


/**
 * Routes
 */
app.use("/contacts", require("./routes/contacts"));

app.use("/", (req, res, next) =>{
    res.status(200).send("Welcome to Project 1 Contacts API - Heitor C. Cazado")
});


/**
 * Initializing Server
 */
const PORT = process.env.PORT || 8080;

mongodb.initDb((error)=>{
    if(error){
        console.log(error);
    }
    else{
        app.listen(PORT, ()=>{
            console.log(`DB Connected and server running on PORT: ${PORT}`);
        });
    }
})
