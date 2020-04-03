const express = require("express");
const router = express.Router();
const { uploadPriceList, getPriceList } = require("../controllers/priceList");
const { isAuth, isAdmin } = require("../middleware/auth");

router
  .route("/")
  .get(isAuth, getPriceList)
  .post(isAuth, isAdmin, uploadPriceList);

module.exports = router;
