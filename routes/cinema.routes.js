const express = require("express");
const router = express.Router();

const cinemaController = require("../controller/cinema.controller");

router.get("/", cinemaController.getAll);
router.get("/:id", cinemaController.getById);
router.post("/create", cinemaController.create);
router.put("/update/:id", cinemaController.update);
router.delete("/delete/:id", cinemaController.delete);
module.exports = router;
