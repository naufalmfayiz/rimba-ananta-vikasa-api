const express = require("express");
const userRoute = require("./routers/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.use("/users", userRoute);
app.use(errorHandler);

module.exports = app;
