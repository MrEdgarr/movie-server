const express = require("express");
const router = express.Router();

const movieController = require("../controller/movie.controller");

router.get("/", movieController.getAll);
router.get("/:id", movieController.getById);
router.post("/create", movieController.create);
router.put("/update/:id", movieController.update);
router.delete("/delete/:id", movieController.delete);
module.exports = router;
