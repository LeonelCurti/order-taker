const express = require("express");
const router = express.Router();
const {
  uploadPriceList,
  getPriceList,
  downloadPriceList,
} = require("../controllers/priceList");
const { auth } = require("../middleware/auth");
const { roles } = require("../utils/roles");

router.get("/", auth(), getPriceList);
router.get("/download", auth(), downloadPriceList);
router.post("/", auth(roles.admin), uploadPriceList);

module.exports = router;
