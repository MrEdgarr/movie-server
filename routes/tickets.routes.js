const express = require("express");
const router = express.Router();

const ticketsController = require("../controller/tickets.controller");

router.get("/", ticketsController.getAll);
router.get("/:id", ticketsController.getById);
router.post("/", ticketsController.create);
router.put("/:id", ticketsController.update);
router.delete("/:id", ticketsController.delete);
module.exports = router;
