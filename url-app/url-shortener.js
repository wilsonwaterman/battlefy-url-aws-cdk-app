const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const urlAppRoutes = require("./routes/endpoint-routes.js");

main()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.get("/", (req, res) => {
//    res.send("hello world");
//});

app.use("/api/url-shortener", urlAppRoutes);

app.listen(8080, () => {
    console.log("listening on port 8080");
});
