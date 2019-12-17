const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const util = require("../utils/utils.js");

exports.generateToken = async function(payload){
    let secret = config.getConfig() ["jwt"] ["secret"];
    let signOptions = {expiresIn: "2h" , algorithm:"HS256"};
    try{
        return new Promise((resolve, reject) => {
            jwt.sign(payload, secret, signOptions, (err, token) => {
                if(err){
                    console.log("Unable to generate Token with err:", err);
                    reject(util.rejectResponse(err));
                }else{
                    resolve(util.resolveResponse(token));
                }
            });
        });

    }catch (e){
        throw new Error(e.message);
    }

};

exports.verifyToken = async function (token){
    let secret = config.getConfig()["jwt"]["secret"];
    let verifyOptions = {expiresIn: "2h", algorithms :["HS256"]};

    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if(err){
                reject(util.rejectResponse(err));
            }else{
                resolve(util.resolveResponse(decoded));
            }
        });
    });

};
