const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const routes = require("./routes");
const db = require("./db/db.js");
const config = require("./config/config.js");
const apiResponse = require("./utils/apiResponse.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/api", routes);
app.get("/", function(req, res){
    res.send("App is working!");
});
app.all("*", (req, res) => {
    return apiResponse.notFoundResponse(res, "Page Not found");
});

const init = async function(){
    cf = await config.init();
    port = cf["data"]["port"];
    await db.init();
    app.listen(port, function(){
        console.log("App started at port:", port);
    });
};
init();
