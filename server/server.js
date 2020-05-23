const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv");
const cors = require('cors')

//Environmental variables
dotenv.config();

//Connect DB
connectDB();

//Body parser
app.use(express.json({ extended: false }));

// Cookie parser
app.use(cookieParser())

//Dev logger middleware
app.use(morgan("dev"));

//File upload middleware
app.use(fileupload());

//Enable CORS
app.use(cors())

//Mount routers
app.use("/api/v1/pricelist", require("./routes/priceList"));
app.use("/api/v1/auth", require("./routes/auth"))
app.use("/api/v1/order", require("./routes/order"))

//Custom express error handler
app.use(errorHandler);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server running`.yellow)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err}`);
  server.close(() => proccess.exit(1));
});
