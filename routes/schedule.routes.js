const express = require("express");
const router = express.Router();

const scheduleController = require("../controller/schedule.controller");

router.get("/", scheduleController.getAll);
router.get("/:id", scheduleController.getById);
router.get("/date/:id&:date", scheduleController.getByDate);

module.exports = router;
