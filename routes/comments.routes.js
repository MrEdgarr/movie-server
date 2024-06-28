const express = require("express");
const router = express.Router();

const commentsController = require("../controller/comments.controller");

router.get("/", commentsController.getAll);
router.get("/:id", commentsController.getById);
router.post("/create", commentsController.create);
router.put("/update/:id", commentsController.update);
router.delete("/delete/:id", commentsController.delete);
module.exports = router;
