const express = require("express");
const router = express.Router();

const seatController = require("../controller/seats.controller");

router.get("/:id", seatController.getById);
module.exports = router;
