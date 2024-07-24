const express = require("express");
const router = express.Router();

const ratingController = require("../controller/rating.controller");

router.get("/:id", ratingController.getAll);
router.get("/:id/", ratingController.getById);
router.post("/", ratingController.create);
router.put("/", ratingController.update);
router.delete("/", ratingController.delete);
module.exports = router;
