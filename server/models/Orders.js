const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    client: {
      required: true,
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    number: {
      type: Number,
    },
    items: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
    },
    notes: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      enum: ["open", "closed", "received"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
