const express = require("express");
const router = express.Router();

const cinemaController = require("../controller/cinema.controller");

router.get("/", cinemaController.getAll);
router.get("/:id", cinemaController.getById);
router.post("/", cinemaController.create);
router.put("/:id", cinemaController.update);
router.delete("/:id", cinemaController.delete);
module.exports = router;
