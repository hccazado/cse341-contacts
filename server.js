const express = require("express");
const app = express();
const {MongoClient} = require('mongodb');
const mongodb = require("./db/connect");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

dotenv.config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * Routes
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer: true}));
app.use("/", require("./routes"));
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
