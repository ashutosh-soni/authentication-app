const fs = require("fs");

// global config object
config = {};

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
                config = newConfig;
                resolve({err: false,
                         data: config});
                break;
            case "test":
                console.log("Config init for:", activeEnv);
                data = require("./test/test-config.json");
                newConfig = Object.assign({}, commonConfig, data);
                config = newConfig;
                resolve({err: false,
                         data: config});
                break;
            default:
                // default Env is DEV
                console.log("Config init for:", activeEnv);
                data = require("./dev/dev-config.json");
                newConfig = Object.assign({}, commonConfig, data);
                config = newConfig;
                resolve({err: false,
                         data: config});



            }

        });
    } catch(e){
        console.log("Config init Failed", e);
    }

};

module.exports = {init, config};
