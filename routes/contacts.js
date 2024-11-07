const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getSingle);
router.post("/", contactsController.createOne);
router.put("/:id", contactsController.update);
router.delete("/:id", contactsController.delete);

module.exports = router;