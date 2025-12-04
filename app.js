const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));
var moment = require("moment");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Auto Refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// GET Requests
app.get("/", (req, res) => {
  //result => array of objects
  User.find()
    .then((result) => res.render("index", { data: result, moment: moment }))
    .catch((err) => console.error(err));
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { data: result, moment: moment });
    })
    .catch((err) => console.error(err));
});

app.get("/view/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { data: result, moment: moment });
    })
    .catch((err) => console.error(err));
});

// POST Requests
app.post("/user/add.html", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.error(err));
});

// DELETE Request
app.delete("/edit/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.error(err));
});

mongoose
  .connect(
    "mongodb+srv://elsultanmasr_db_user:DBpassword123@cluster0.xcbgw1z.mongodb.net/?appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
