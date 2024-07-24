const express = require("express");
const router = express.Router();

const slideController = require("../controller/banner.controller");

router.get("/", slideController.getAll);

module.exports = router;
