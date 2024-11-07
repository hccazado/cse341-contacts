const express = require("express");
const router = express.Router();
const contacts = require("./contacts");

router.use("/", (req, res, next) =>{
    // #swagger.ignore = true
    res.status(200).send("Welcome to Project 1 Contacts API - Heitor C. Cazado")
});

router.use("/contacts", contacts);

module.exports = router;