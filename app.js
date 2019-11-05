const express = require("express");
const app = express();
const routes = require("./routes")

app.get("/", function(req, res){
    res.send("App is working!");
});

app.use("/api", routes)

app.listen(3000, function(){
    console.log("App started at port: 3000");
});
