const mongoose = require("mongoose");
const Url = require("../url"); // 載入 url model
const urlList = require("../../urls.json").results;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
// db.once("open", () => {
//   console.log("mongodb connected!");
// });

db.once("open", () => {
  console.log("Running url Seeder JS");

  Url.create(urlList)
    .then(() => {
      console.log("urlSeeder Done");
      db.close();
    })
    .catch((err) => console.log(err));
});
