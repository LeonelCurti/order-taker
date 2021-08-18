const mongoose = require("mongoose");
const db = mongoose.connection;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

db.on("connected", () => {
  console.log("DB connected.".yellow);
});
db.on("error", function (err) {
  console.log(`${err.name}:\n${err.message}\n`.yellow);
  process.exit();
});

db.on("disconnected", function () {
  console.log("DB disconnected.");
});

function connectDB() {
  return mongoose.connect(process.env.MONGO_URI, config);
}

module.exports = { db, connectDB };
