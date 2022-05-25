const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const orderRouter = require("./routes/orders.router");
const authRouter = require("./routes/auth.router");
const priceListRouter = require("./routes/priceList.router");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("dev"));
app.use(fileupload());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.static(path.join(__dirname, "..", "client", "build")));

//Mount routers
app.use("/api/v1/pricelist", priceListRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/orders", orderRouter);
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
);

//Custom express error handler
app.use(errorHandler);

module.exports = app;
