const mongoose = require("mongoose");

const connectDB = () => { 
  mongoose
    .connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log("MongoDB connected".yellow))
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectDB;
