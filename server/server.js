const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
const path = require("path");

const PORT = process.env.PORT || 5000;

//File upload
app.use(fileupload());

app.get("/", (req, res) => {
  res.send("Api running");
});

app.post("/api/uploadfile", (req, res) => {
  if (!req.files) {
    return res
      .status(400)
      .json({ success: false, msg: "Please upload a file" });
  }
  const file = req.files.file;
  const date = new Date();
  file.name = `priceList_${date.getFullYear()}${date.getMonth()}${date.getDate()}${
    path.parse(req.files.file.name).ext
  }`;
  file.mv(`server/uploas/${file.name}`, async err => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, err });
    }
    res.json({ success: true, data: file.name });
  });
});

app.listen(PORT, () => console.log("Server running"));
