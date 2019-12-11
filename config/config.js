const fs = require("fs");

// global config object
let _config = {};

init = async function (){
    try{
        return new Promise((resolve, reject) =>{
            let activeEnv = process.env.NODE_ENV || "dev";
            commonConfig = require("./common.json");
            switch(activeEnv){
            case "prod":
                console.log("Config init for:", activeEnv);
                data = require("./prod/prod-config.json");
                newConfig = Object.assign({}, commonConfig, data);
                _config = newConfig;
                resolve({err: false,
                         data: _config});
                break;
            case "test":
                console.log("Config init for:", activeEnv);
                data = require("./test/test-config.json");
                newConfig = Object.assign({}, commonConfig, data);
                _config = newConfig;
                resolve({err: false,
                         data: _config});
                break;
            default:
                // default Env is DEV
                console.log("Config init for:", activeEnv);
                data = require("./dev/dev-config.json");
                newConfig = Object.assign({}, commonConfig, data);
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
