const express = require("express");
const router = express.Router();

const scheduleController = require("../controller/schedule.controller");

router.get("/", scheduleController.getAll);
router.get("/:id", scheduleController.getById);
router.post("/", scheduleController.create);
router.put("/:id", scheduleController.update);
router.delete("/:id", scheduleController.delete);

router.post("/moviebyschedule", scheduleController.get_movie_by_schedule);

module.exports = router;
