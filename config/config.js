const util = require("../utils/utils.js");
// global config object
let _config = {};


function addJwtConfig(object, jwtSecret){
    let jwtConfig = {"jwt": {"secret": jwtSecret}};
    return util.mergeObject(object, jwtConfig);

}


const init = async function (){
    try{
        return new Promise((resolve, reject) =>{
            // get NODE_ENV from Enviroment varaible.
            let activeEnv = process.env.NODE_ENV || "dev";
            // get JWT_SECRET
            let jwtSecret = process.env.JWT_SECRET;

            commonConfig = require("./common.json");
            commonConfig = addJwtConfig(commonConfig, jwtSecret);

            switch(activeEnv){
            case "prod":
                console.log("Config init for:", activeEnv);
                data = require("./prod/prod-config.json");
                newConfig = util.mergeObject(commonConfig, data);
                _config = newConfig;
                resolve({err: false,
                         data: _config});
                break;
            case "test":
                console.log("Config init for:", activeEnv);
                data = require("./test/test-config.json");
                newConfig = util.mergeObject(commonConfig, data);
                _config = newConfig;
                resolve({err: false,
                         data: _config});
                break;
            default:
                // default Env is DEV
                console.log("Config init for:", activeEnv);
                data = require("./dev/dev-config.json");
                newConfig = util.mergeObject(commonConfig, data);
                _config = newConfig;
                resolve({err: false,
                         data: _config});



            }

        });
    } catch(e){
        console.log("Config init Failed");
        throw new Error(e.message);
    }

};

function getConfig(){
    return _config;
}

module.exports = {init, getConfig};
