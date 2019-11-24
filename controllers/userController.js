const userService = require("../services/userService.js");

var register = async function(req, res, next){
    try{
        await userService.insertUser(req.body);
        res.sendStatus(201);
        next();
    }catch (e){
        console.log(e.message);
        res.sendStatus(500) && next(error);
    }
}

module.exports = {register};
