const bcrypt = require("bcrypt");
const db = require("../db/db.js");
const apiResponse = require("../utils/apiResponse.js");
const jwtService = require("../services/jwtService.js");

// Salt for hasing
const saltRounds = 10;

exports.insertUser = async function (req, res){
    try {

        let query = {email: req.body.email};
        let userAlreadyExist = await db.findOne(query);

        if(userAlreadyExist.result){
            // this block execute when userAlreadyExist is true.
            let msg = "User already exist with email " + req.body.email;
            return apiResponse.validationError(res, msg);

        }else{
            // hash the password
            let hashedPassword = await bcrypt.hash(req.body.password,
                                                   saltRounds);
            // Prepare the doc
            // Note there are 3 roles for user [external, internal, admin]
            // at present we are hardcoding for internal user only.

            let doc = {email: req.body.email,
                       password: hashedPassword,
                       name: req.body.name,
                       role: "internal"};

            let insertResult = await db.insert(doc);

            if(insertResult.status){
                console.log("Data is inserted successfully! with id:",
                            insertResult.result.insertedId);
                let responseData = {"_id": insertResult.result.insertedId};
                apiResponse.successResponseWithData(res, "Registration Success",
                                                    responseData);
            } else{
                console.log("Sorry data insertion failed", insertResult.err);
                apiResponse.ErrorResponse(res, "Sorry data insertion failed");
            }
        }

    } catch(e){
        throw new Error(e.message);
    }

};

exports.findUser = async function (req, res){
    try {
        let query = {email: req.body.email};
        let userDb = await db.findOne(query);

        if(userDb.result){
            let requestPassword = req.body.password;
            let dbPassword = userDb.result.password;

            // check password
            let match = await bcrypt.compare(requestPassword, dbPassword);
            if(match){
                // password matched allow login.
                let payload = {email :  userDb.result["email"],
                               id: userDb.result["_id"],
                               role:userDb.result["role"]};

                let generateToken = await jwtService.generateToken(payload);

                if (generateToken.status){
                    let tokenResponse = "Token " + generateToken.result ;
                    apiResponse.successResponseWithData(res, "Login successfully",
                                                        tokenResponse);
                }


            }else{
                // password matched failed.
                apiResponse.unauthorizedResponse(res, "Password is incorrect");
            }

        }else{
            apiResponse.unauthorizedResponse(res, "User with email not exist");
        }


    } catch(e){
        throw new Error(e.message);
    }

}
