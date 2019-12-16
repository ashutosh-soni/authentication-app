const util = require("../utils/utils.js");
// global config object
let _config = {};


function addJwtConfig(object, privateKey, publicKey){
    let jwtConfig = {"jwt": {"privateKey": privateKey,
                             "publicKey": publicKey}
                    };
    return util.mergeObject(object, jwtConfig);

}


const init = async function (){
    try{
        return new Promise((resolve, reject) =>{
            // get NODE_ENV from Enviroment varaible.
            let activeEnv = process.env.NODE_ENV || "dev";
            // get JWT_PRIVATE_KEY
            let jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
            // get JWT_PUBLIC_KEY
            let jwtPublicKey = process.env.JWT_PUBLIC_KEY;

            commonConfig = require("./common.json");
            commonConfig = addJwtConfig(commonConfig, jwtPrivateKey, jwtPublicKey);
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
