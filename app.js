const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const app = express();

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDBコネクションOK!");
  })
  .catch(() => {
    console.log("MongoDBコネクションERROR!");
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render('home');
});

app.get("/makecampground", async (req, res) => {
  const camp = new Campground({title: '私の庭', description: '気軽に安くキャンプ'})
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("ポート3000リスエスト待機中");
});
