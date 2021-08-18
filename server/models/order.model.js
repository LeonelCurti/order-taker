const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      required: true,
      type: mongoose.Schema.ObjectId,
      ref: "User",
      select: false //need true in select to show
    },
    number: {
      type: Number,
      unique:true
    },
    items: {
      type: Array,
      default: [
        {
          id: 1469335,
          cod: "456963",
          descrip: "ABRAZADERA CREMALLERA",
          price: 34.26,
          quantity: 4,  
        },
        {
          id: 1469335,
          cod: "951535",
          descrip: "CONTROL REMOTO",
          price: 60,
          quantity: 2,  
        },
        {
          id: 1469335,
          cod: "753003",
          descrip: "MOCHILA CAMUFLADA",
          price: 100,
          quantity: 3,  
        },
      ],
    },
    total: {
      type: Number,
      default: 557.04//change to 0 
    },
    notes: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      enum: ["open", "submitted", "received"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
