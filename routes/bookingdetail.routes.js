const express = require("express");
const router = express.Router();

const bookingDetailController = require("../controller/bookingdetail.controller");

router.get("/", bookingDetailController.getAll);
router.get("/:id", bookingDetailController.getById);
router.post("/create", bookingDetailController.create);
router.put("/update/:id", bookingDetailController.update);
router.delete("/delete/:id", bookingDetailController.delete);
module.exports = router;
