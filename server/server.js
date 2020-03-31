const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv");

//Environmental variables
dotenv.config();

//Connect DB
connectDB();

//Route files
const priceList = require("./routes/priceList");

//Dev logger middleware
app.use(morgan("dev"));

//File upload middleware
app.use(fileupload());

//Mount routers
app.use("/api/v1/pricelist", priceList);

//Custom express error handler
app.use(errorHandler);

app.get("/", (req, res) => {
  //api documentation goes here
  res.send("Api documentation");
});

app.listen(process.env.PORT, () => console.log(`Server running`.yellow));

// process.on('unhandledRejection',(err,promise)=>{
//   console.log(`Error: ${err.message}`);
//   server.close(()=>proccess.exit(1))
// })
