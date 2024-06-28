const express = require("express");
const router = express.Router();

const bookingController = require("../controller/booking.controller");

router.get("/", bookingController.getAll);
router.get("/:id", bookingController.getById);
router.post("/create", bookingController.create);
router.put("/update/:id", bookingController.update);
router.delete("/delete/:id", bookingController.delete);
module.exports = router;
