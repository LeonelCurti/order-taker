const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_PROD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Successfully connect to MongoDB".yellow);
  } catch (err) {
    console.error("Connection error", err);
    process.exit();
  }
};

module.exports = connectDB;
