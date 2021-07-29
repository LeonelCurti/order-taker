const express = require("express");
const priceListRouter = express.Router();
const {
  uploadPriceList,
  getPriceList,
  downloadPriceList,
} = require("../controllers/priceList");
const { auth } = require("../middleware/auth");
const { roles } = require("../utils/roles");

priceListRouter.get("/", auth(), getPriceList);
priceListRouter.get("/download", auth(), downloadPriceList);
priceListRouter.post("/", auth(roles.admin), uploadPriceList);

module.exports = priceListRouter;
