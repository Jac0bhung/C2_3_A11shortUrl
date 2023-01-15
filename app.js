// 載入 express 並建構應用程式伺服器
const express = require("express");
const mongoose = require("mongoose"); // 載入 mongoose
const exphbs = require("express-handlebars");

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // 設定連線到 mongoDB

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongooseDB Error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 設定首頁路由
app.get("/", (req, res) => {
  // res.send("hello world_shortUrl");
  res.render("index");
});

// 設定 port 3000
app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
