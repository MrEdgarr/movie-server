const express = require("express");
const router = express.Router();

const cityController = require("../controller/city.controller");

router.get("/", cityController.getAll);
router.get("/:id", cityController.getById);
router.post("/create", cityController.create);
router.put("/update/:id", cityController.update);
router.delete("/delete/:id", cityController.delete);
module.exports = router;
