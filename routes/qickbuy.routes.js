const express = require("express");
const router = express.Router();

const qickbuyController = require("../controller/qickbuy.controller");

router.get("/:id", qickbuyController.getAllByMovie);
router.get("/:id/:cid", qickbuyController.getDateByMovieCinema);
router.get("/movie=:id/cinema=:cid/:dateid", qickbuyController.getscheduleByMovieCinema);
module.exports = router;
