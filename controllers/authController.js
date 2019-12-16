const authService = require("../services/authService.js");
const {body, validationResult, sanitizeBody} = require("express-validator");
const apiResponse = require("../utils/apiResponse.js");

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
    sanitizeBody("email").escape(),
    sanitizeBody("password").escape()];




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



// module.exports = {register};
