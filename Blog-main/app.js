const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const PORT = 1212;
const app = express();
const feedController = require("./controllers/feedsController");


const database =
  "mongodb+srv://ammar:Ammar@cluster0.xjb2txi.mongodb.net/?retryWrites=true&w=majority";
const FEED = require("./models/FEED");


app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));



mongoose.set("strictQuery", false);



mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("DATABASE Connected");
    app.listen(PORT);
  });

app.get("/feed", feedController.feed_index);

app.get("/feed/:id", feedController.feed_details);

app.get("/feed/edit/:id", feedController.feed_update_get);

app.post("/feed/update/:id", feedController.feed_update_post);

app.get("/delete/:id", feedController.feed_delete);

app.post("/post", feedController.feed_post);
