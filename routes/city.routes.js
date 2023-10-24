const express = require("express");
const router = express.Router();

const cityController = require("../controller/city.controller");

router.get("/", cityController.getAll);
router.get("/:id", cityController.getById);
router.post("/", cityController.create);
router.put("/:id", cityController.update);
router.delete("/:id", cityController.delete);
module.exports = router;
