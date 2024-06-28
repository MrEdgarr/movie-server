const express = require("express");
const router = express.Router();

const ticketsController = require("../controller/tickets.controller");

router.get("/", ticketsController.getAll);
router.get("/:id", ticketsController.getById);
router.post("/create", ticketsController.create);
router.put("/update/:id", ticketsController.update);
router.delete("/delete/:id", ticketsController.delete);
module.exports = router;
