const express = require("express");
const router = express.Router();

const quicksController = require("../controller/quicks.controller");

router.get("/:id", quicksController.getAllByMovie);
router.get("/:id/:cid", quicksController.getDateByMovieCinema);
router.get("/:id/:cid/:dated", quicksController.getscheduleByMovieCinema);
module.exports = router;
