const express = require("express");
const router = express.Router();

const postsController = require("../controller/post.controller");

router.get("/", postsController.getAll);
console.log('asd');
module.exports = router;
