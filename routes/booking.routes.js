const express = require("express");
const router = express.Router();

const bookingController = require("../controller/booking.controller");

router.get("/", bookingController.getAll);
router.get("/:id", bookingController.getById);
router.post("/", bookingController.create);
// router.put("/:id", bookingController.update);
// router.delete("/:id", bookingController.delete);
module.exports = router;
