const http = require("http");
const path = require("path");
const colors = require("colors");
require("dotenv").config();
const { db, connectDB } = require("./server/config/dbConnection");
const app = require("./server/app.js");
const server = http.createServer(app);

connectDB().then(
  () => {
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log(`Server listening on port ${port}.`.yellow);
      process.send && process.send("ready");
    });
  },
  (err) => {
    console.log("Failed DB connection on startup.");
    console.log(err.message);
    process.exit(0);
  }
);

process.on("unhandledRejection", (err, promise) => {
  console.log("Unhandled rejection at ", promise, `reason: ${err.message}.`);
  gracefulExit();
});

process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}.`);
  gracefulExit();
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received.");
  gracefulExit();
});

const gracefulExit = () => {
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    db.close(() => {
      process.exit(0); //exit with success
    });
  });
};
