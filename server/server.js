const express = require("express");
const fileupload = require("express-fileupload");
const colors = require("colors");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const errorHandler = require("./middleware/errorHandler");

//Route files
const priceList = require("./routes/priceList");

const app = express();

//Dev logger only in dev mode
app.use(morgan("dev"));


//File upload
app.use(fileupload());

//Mount routers
app.use("/api/v1/pricelist", priceList);

//Error handler
app.use(errorHandler);

app.get("/", (req, res) => {
  //api documentation goes here
  res.send("Api documentation");
});

app.listen(PORT, () => console.log("Server running".yellow));

// const server = app.listen(PORT, () => console.log("Server running".yellow));
 
// process.on('unhandledRejection',(err,promise)=>{
//   console.log(`Error: ${err.message}`);
//   server.close(()=>proccess.exit(1))
// })