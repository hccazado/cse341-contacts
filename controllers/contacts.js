const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const controller = {
    getAll : async (req, res, next) => {
        const result = await mongodb.getDb().db("project1").collection("contacts").find();
        const contacts = await result.toArray();
        res.setHeader("Content-type", "application/json");
        res.status(200).json(contacts);
    },
    getSingle : async (req, res, next) =>{
        try{
            const contactId = ObjectId.createFromHexString(req.params.id);
            const result = await mongodb.getDb().db("project1").collection("contacts").find({_id: contactId});
            const contacts = await result.toArray();
            res.setHeader("Content-type", "application/json");
            res.status(200).json(contacts[0]);
        }
        catch (error){
            res.status(405).json("Invalid requisition."+error.message);
        }
        
    }
}

module.exports = controller;