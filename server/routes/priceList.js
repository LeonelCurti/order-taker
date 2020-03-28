const express = require("express");
const router = express.Router();
const XLSX = require('xlsx');

router.get("/", (req, res,next) => {
  try {
    const workbook = XLSX.readFile('servr/uploads/priceList_2020227.xlsx');
  
    //get array of sheet names   
    const sheet_name_list = workbook.SheetNames;
  
    //Get json of page1 (index=0) 
    const pricingListJson= XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]],{defval:""})
    
    res.status(200).json({ success: true, products: pricingListJson })
  } catch (error) {     
    //if (err.code !== 'ENOENT') throw err;
    return res.status(500).json({ success: false, msg: "Can not get price list" })
  }
  
});

module.exports = router
