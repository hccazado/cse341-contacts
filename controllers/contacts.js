const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const controller = {
    getAll : async (req, res, next) => {
        /*
            #swagger.description = Returns all stored conntacts
        */
        const result = await mongodb.getDb().db("project1").collection("contacts").find();
        const contacts = await result.toArray();
        res.setHeader("Content-type", "application/json");
        res.status(200).json(contacts);
    },
    getSingle : async (req, res, next) =>{
        /*
            #swagger.description = Returns the contact with informed ID
        */
        try{
            const contactId = ObjectId.createFromHexString(req.params.id);
            const result = await mongodb.getDb().db("project1").collection("contacts").find({_id: contactId});
            const contacts = await result.toArray();
            res.setHeader("Content-type", "application/json");
            res.status(200).json(contacts[0]);
        }
        catch (error){
            res.status(405).json("Invalid requisition."+error.message);
            throw new Error("Error: "+error.message);
        }
    },
    createOne: async (req, res, next) =>{
        /*
            #swagger.description = Create a new contact and returns its ID
        */
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthday: req.body.birthday,
            favoriteColor: req.body.favoriteColor
        };

        try{
            const result = await mongodb.getDb().db("project1").collection("contacts").insertOne(contact);

            if(result.insertedId){
                res.setHeader("Content-type", "application/json");
                res.status(201).json({contactId: result.insertedId});
            }
            else{
                res.setHeader("Content-type", "application/json");
                res.status(500).json({message: "Oops! Something went wrong"});
            }
        } catch(error){
            throw new Error("Error: "+error.message);
        }
    },
    update: async (req, res, next) =>{
        /*
            #swagger.description = Update contact data
        */
        const newContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthday: req.body.birthday,
            favoriteColor: req.body.favoriteColor
        };

        try{
            const contactId = ObjectId.createFromHexString(req.params.id);
            const result = await mongodb.getDb().db("project1").collection("contacts").replaceOne({_id:contactId}, newContact);

            if(result.modifiedCount){
                res.setHeader("Content-type", "application/json");
                res.status(200).json({message: "Successfully updated!"});
            }
            else{
                res.setHeader("Content-type", "application/json");
                res.status(500).json({message: "Oops! Something went wrong"});
            }
        } catch(error) {
            throw Error("Error: "+error.message);
        }
    },
    delete: async (req, res, next) =>{
        /*
            #swagger.description = Delete the contact from the specified ID
        */
        try{
            const contactId = ObjectId.createFromHexString(req.params.id);
            const result = await mongodb.getDb().db("project1").collection("contacts").deleteOne({_id: contactId});
            if(result.deletedCount){
                res.setHeader("Content-type", "application/json");
                res.status(200).json({message: "Successfully deleted!"})
            }
            else{
                res.setHeader("Content-type", "application/json");
                res.status(500).json({message: "Oops! Something went wrong"});
            }
        } catch(error) {
            throw Error("Error: "+error.message);
        }

    }
}

module.exports = controller;