const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const orderRouter = require("./routes/orders");
const authRouter = require("./routes/auth");
const priceListRouter = require("./routes/priceList");
const errorHandler = require("./middleware/errorHandler");
dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});
let server;

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("dev"));
app.use(fileupload());
app.use(
  helmet({
    // contentSecurityPolicy: { reportOnly: true },
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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb".yellow);
  server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running in ${process.env.NODE_ENV}`.yellow);
    process.send && process.send("ready");
  });
});

mongoose.connection.on("error", function (err) {
  console.log("Could not connect to mongodb".yellow);
  console.log(`${err.name}: ${err.message}\n`.yellow);
  process.exit();
});

process.on("unhandledRejection", (err, promise) => {
  console.log("Unhandled rejection at ", promise, `reason: ${err.message}`);
  gracefulExit();
});

process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  gracefulExit();
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received.");
  gracefulExit();
});

const gracefulExit = () => {
  // Stops the server from accepting new connections and finishes existing connections.
  server.close(function (err) {
    console.log("Server shut down.");
    if (err) {
      console.error(err);
      process.exit(1);
    }
    mongoose.connection.close(function () {
      console.log("DB disconnected.");
      process.exit(0);
    });
  });
};
