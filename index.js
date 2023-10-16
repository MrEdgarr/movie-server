const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const product = require("./api/product");
const postsRouter = require("./routes/post.routes");

app.use("/api/product", product);
app.use("/api/v1/post", postsRouter);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server is running in POST ${PORT}`));
