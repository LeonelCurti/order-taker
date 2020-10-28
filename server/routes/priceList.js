const express = require("express");
const router = express.Router();
const {
  uploadPriceList,
  getPriceList,
  downloadPriceList,
} = require("../controllers/priceList");
const { isAuth, isAdmin } = require("../middleware/auth");

router.get("/", isAuth, getPriceList);
router.get("/download",isAuth, downloadPriceList);
router.post("/", isAdmin, uploadPriceList);

module.exports = router;
