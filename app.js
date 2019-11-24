const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const routes = require("./routes");
const db = require("./db/db.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/api", routes);
app.get("/", function(req, res){
    res.send("App is working!");
});

const init = async function(){
    await db.init();
    app.listen(3000, function(){
        console.log("App started at port: 3000");
    });
}
init();
