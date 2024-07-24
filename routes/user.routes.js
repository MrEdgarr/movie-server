const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");

router.get("/", userController.getAll);
router.post("/login", userController.loginController);
router.get("/:id", userController.getById);
router.post("/register", userController.create);
router.put("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);
module.exports = router;
