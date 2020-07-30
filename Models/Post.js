const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  City: {
    type: String,
    required: true,
  },
  Temp: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Temperatures", PostSchema);
