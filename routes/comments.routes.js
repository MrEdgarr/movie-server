const express = require("express");
const router = express.Router();

const commentsController = require("../controller/comments.controller");

router.get("/", commentsController.getAll);
router.get("/:id", commentsController.getById);
router.post("/", commentsController.create);
router.put("/:id", commentsController.update);
router.delete("/:id", commentsController.delete);
module.exports = router;
