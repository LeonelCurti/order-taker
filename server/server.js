const express = require("express");
const fileupload = require("express-fileupload");
const PORT = process.env.PORT || 5000;

const app = express();

//Route files
const uploadFile = require("./routes/uploadFile");
const priceList = require("./routes/priceList");

//File upload
app.use(fileupload());

// Mount routers
app.use("/api/v1/uploadfile", uploadFile);
app.use("/api/v1/pricinglist", priceList);

app.get("/", (req, res) => {
  res.send("Api running");
});

app.listen(PORT, () => console.log("Server running"));
