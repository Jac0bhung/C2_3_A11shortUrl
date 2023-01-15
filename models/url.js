const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  original_url: {
    type: String, // 資料型別是字串
    required: true, // 這是個必填欄位
  },

  short_url: {
    type: String,
  },
});
module.exports = mongoose.model("Url", urlSchema);
