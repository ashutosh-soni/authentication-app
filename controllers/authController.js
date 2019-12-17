const {body, validationResult, sanitizeBody} = require("express-validator");
const apiResponse = require("../utils/apiResponse.js");
const authService = require("../services/authService.js");
const jwtService = require("../services/jwtService.js");

/**
 * USER REGISTERATION
 *
 * @param {string} email
 * @param {string} password
 *
 * @param {object}
 */

exports.registerValidate = [
    body("email").isLength({min:1}).trim().withMessage("Email must be specifiled")
        .isEmail().withMessage("Enter a valid email address"),
    body("password").isLength({min:6}).trim()
        .withMessage("Password must be 6 characteror greater"),
    body("name").isLength({min:2}).trim().withMessage("user name should be of atleast 3 charcter"),
    sanitizeBody("email").escape(),
    sanitizeBody("password").escape(),
    sanitizeBody("name").escape()] ;




exports.register = async function(req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // Display sanitized values/errors messages.
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else{
            await authService.insertUser(req, res);
        }

    }catch(e){
        // Throw error in json response wth status 500.
        return apiResponse.ErrorResponse(res, e.message);
    }
};

exports.login= async function(req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // Display sanitized values/errors messages.
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else{
            authService.findUser(req, res);
        }

    }catch(e){
        // Throw error in json response wth status 500.
        return apiResponse.ErrorResponse(res, e.message);
    }
};


// authenticated? is the middleware function which is used to check
// wheater the req has valid JWT token or not.
exports.isAuthenticated = async function (req, res, next){
    let getTokenHeader = req.headers["authorization"];
    if(!getTokenHeader){
        apiResponse.unauthorizedResponse(res, "Access Denied. No token is provided");

    }else{

        // NOTE: getTokenHeader is a string of format: "Token xyzabxc"
        // and "xyzabxc" is our token. we need to extract that.
        let token = getTokenHeader.split(" ")[1];

        try{
            let verifyToken = await jwtService.verifyToken(token);
            if(verifyToken.status){
                console.log("Received token data: ", verifyToken.result);
                next();
            }else{
                apiResponse.unauthorizedResponse(res, "Access denied. Token is invalid");
            }
        }catch(e){
            apiResponse.unauthorizedResponse(res, "Access denied. Token is invalid");
        }




    }

};


// module.exports = {register};
