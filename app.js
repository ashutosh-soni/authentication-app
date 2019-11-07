const express = require("express");
const app = express();
const routes = require("./routes")
// DB connection
const db = require("./db/db.js");
db.init();


const MongoClient = require("mongodb").MongoClient
var url = "mongodb://localhost:27017"
var dbName = "authentication-app"


app.get("/", function(req, res){
    res.send("App is working!");
});

app.use("/api", routes);

app.listen(3000, function(){
    console.log("App started at port: 3000");
});
