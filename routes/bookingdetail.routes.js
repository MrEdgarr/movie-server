const express = require("express");
const router = express.Router();

const bookingDetailController = require("../controller/bookingdetail.controller");

router.get("/", bookingDetailController.getAll);
router.get("/:id", bookingDetailController.getById);
router.post("/", bookingDetailController.create);
// router.put("/:id", bookingDetailController.update);
// router.delete("/:id", bookingDetailController.delete);
module.exports = router;
