const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  expireAt: Date,
  createdAt: { type: Date, default: Date.now },
  createdByIp: String,
});

// schema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret) {
//     // remove these props when object is serialized
//     delete ret._id;
//     delete ret.id;
//     delete ret.user;
//   },
// });

schema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("RefreshToken", schema);
