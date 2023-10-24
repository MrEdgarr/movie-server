const express = require("express");
const router = express.Router();

const scheduleController = require("../controller/schedule.controller");

router.get("/", scheduleController.getAll);
router.get("/:id", scheduleController.getById);
router.get("/date/:id&:date", scheduleController.getByDate);
router.post("/", scheduleController.create);
router.put("/:id", scheduleController.update);
router.delete("/:id", scheduleController.delete);
module.exports = router;
