const express = require("express");
const router = express.Router();

const movieController = require("../controller/movie.controller");

router.get("/", movieController.getAll);
router.get("/:id", movieController.getById);
router.post("/", movieController.create);
router.put("/:id", movieController.update);
router.delete("/:id", movieController.delete);
module.exports = router;
