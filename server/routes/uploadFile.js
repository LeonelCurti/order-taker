const express = require("express");
const router = express.Router();
const path = require("path");

router.post("/", (req, res) => {
  //Check if there is a file
  if (!req.files) {
    return res
      .status(400)
      .json({ success: false, msg: "No files were uploaded" });
  }
  const file = req.files.file;

  //Check file size
  if (file.size > 1048576) {
    return res
      .status(400)
      .json({ success: false, msg: "File should be less than 1Mb" });
  }

  //Generate file path
  const fileExtension = path.parse(req.files.file.name).ext;

  //Validate file extension. Only excel files.
  if (fileExtension === ".xls" || fileExtension === ".xlsx") {
    const date = new Date();
    file.name = `priceList_${date.getFullYear()}${date.getMonth()}${date.getDate()}${fileExtension}`;
    // Save file in storage
    file.mv(`./server/uploads/${file.name}`, async err => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, err });
      }
      res.status(200).json({ success: true, data: file.name });
    });
  } else {
    return res.status(400).json({ success: false, msg: "Invalid file" });
  }
});

module.exports = router;
