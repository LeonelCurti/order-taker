const express = require("express");
const router = express.Router();
const { 
  uploadPriceList, 
  getPriceList 
} = require("../controllers/priceList");

router
  .route("/")
  .get(getPriceList)
  .post(uploadPriceList);

module.exports = router;
