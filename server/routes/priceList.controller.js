const ErrorResponse = require("../utils/errorResponse");
const XLSX = require("xlsx");
const path = require("path");

//@desc    Get json with price list
//@route   GET api/v1/files/pricelist
//@access  Public

exports.getPriceList = (req, res, next) => {
  try {
    const filePath = path.join(__dirname, "..", "uploads", "priceList.xlsx");

    const workbook = XLSX.readFile(filePath);

    //Get array of sheet names
    const sheet_name_list = workbook.SheetNames;

    //Get json of page1 (index=0)
    const pricingListJson = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]],
      { defval: "" }
    );
    setTimeout(() => {
      res.status(200).json({ success: true, products: pricingListJson });
    }, 300);
  } catch (error) {
    next(error);
  }
};

//@desc    Post json with price list
//@route   POST api/v1/files/pricelist
//@access  Public

exports.uploadPriceList = (req, res, next) => {
  //Check if there is a file
  if (!req.files) {
    return res
      .status(400)
      .json({ success: false, error: "No file was uploaded" });
  }
  const file = req.files.file;

  //Check file size
  if (file.size > 1048576) {
    return res
      .status(400)
      .json({ success: false, error: "File should be less than 1Mb" });
  }

  //Get file extension
  const fileExtension = path.parse(req.files.file.name).ext;

  //Validate file extension. Only excel files.
  if (fileExtension === ".xls" || fileExtension === ".xlsx") {
    file.name = `priceList${fileExtension}`;
    // Save file in storage
    file.mv(`./server/uploads/${file.name}`, async (err) => {
      if (err) {
        next(new ErrorResponse("Cannot upload price list"));
      } else {
        return res.status(200).json({ success: true, data: file.name });
      }
    });
  } else {
    return res
      .status(400)
      .json({ success: false, error: "Invalid excel file" });
  }
};

exports.downloadPriceList = (req, res, next) => {
  // res.download("server/uploads/priceList.xlsx");
  res.download(path.join(__dirname, "..", "uploads", "priceList.xlsx"));
};
