const swaggerAutogen = require("swagger-autogen");
const swaggerUi = require("swagger-ui-express");

const doc = {
    info:{
        title: "CSE341 Contacts API",
        description: "An API to manage contacts. Project1 from BYU-I CSE341 class",
        author: "Heitor C. Cazado",
    },
    host: "https://cse341-6f28.onrender.com/",
    schemes: ["http","https"]
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);