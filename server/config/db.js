const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected".yellow);
  } catch (err) {
    console.error("MongoDB connection failed.", err);
    process.exit();
  }
};

module.exports = connectDB;
