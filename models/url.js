const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  original_Url: {
    type: String,
    require: true,
  },
  short_Url: {
    type: String,
  },
});

module.exports = mongoose.model("Url", urlSchema);
