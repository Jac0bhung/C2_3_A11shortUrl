// 載入 express 並建構應用程式伺服器
const express = require("express");
const mongoose = require("mongoose"); // 載入 mongoose
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Url = require("./models/url.js");
const generateShortUrl = require("./generate_shorturl");

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

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// 設定首頁路由
app.get("/", (req, res) => {
  // res.send("hello world_shortUrl");
  res.render("index");
});
//原始
// app.post("/", (req, res) => {
//   console.log("random url is: ", generateShortUrl(req.body));
//   res.render("index");
// });

// // 設定 port 3000
// app.listen(3000, () => {
//   console.log("App is running on http://localhost:3000");
// });

//參考
//輸入網址轉換成短網址
app.post("/", (req, res) => {
  const original_url = req.body.original_url;
  return Url.findOne({ original_url: original_url })
    .lean()
    .then((link) => {
      if (link === null) {
        let myUrl = generateShortUrl();
        const url = new Url({
          original_url: original_url,
          short_url: myUrl,
        });
        url
          .save()
          .then(() => {
            return url.toObject();
          })
          .then((link) => {
            res.render("success", { link });
          })
          .catch((error) => console.log(error));
      } else {
        res.render("success", { link });
      }
    });
});
//透過短網址轉址到原本網址
app.get("/:short_url", (req, res) => {
  const { short_url } = req.params;
  Url.findOne({ short_url }).then((data) => {
    res.redirect(data.original_url);
  });
});

// app.get("/:short_url", (req, res) => {
//   const { short_url } = req.params;

//   Url.findOne({ short_url })
//     .then((data) => {
//       if (!data) {
//         return res.render("error", {
//           errorMsg: "Can't found the URL",
//           errorURL: req.headers.host + "/" + short_url,
//         });
//       }

//       res.redirect(data.original_url);
//     })
//     .catch((error) => console.error(error));
// });
// start and listen on the Express server
app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
