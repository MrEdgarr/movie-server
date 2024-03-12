const express = require("express");
const router = express.Router();

const slideController = require("../controller/slide.controller");

router.get("/", bookingController.getAll);

module.exports = router;
