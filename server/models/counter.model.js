const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema(
  {
    _id: {
      required: true,
      type: String, 
    },
    count: {
      type: Number,
      default:0
    },
    notes:{
      type:String,
      default:"Increment COUNT using findAndModify to ensure that the COUNT field will be incremented atomically with the fetch of this document"
    }
  } 
);

module.exports = mongoose.model("Counter", CounterSchema);