const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const userController = require("../controller/user.controller");

router.get("/", verifyToken, userController.getAll);
router.get("/:id", userController.getById);

router.post("/login", userController.loginController);
router.post("/register", userController.create);

router.put("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);
module.exports = router;
