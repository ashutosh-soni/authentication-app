const MongoClient = require("mongodb").MongoClient;
const configModule = require("../config/config.js");

let state = {db:null};

const rejectResponse = function (err){
    return {status: 0, err: err};
};

const resolveResponse = function (result){
    return {status: 1, result: result};
};

const getCollection = function (){
    return configModule.getConfig() ["db-spec"] ["collName"];
};

var connect = function(url, dbName, done){
    if (state.db) return done();
    MongoClient.connect(url,
                        {useUnifiedTopology: true,
                         useNewUrlParser: true},
                        function(err, client){
                            if(err) return done(err);
                            state.db = client.db(dbName);
                            // console.log("db object is:",state.db);
                            done();});
};

const get = function (){
    return state.db;
}

exports.init = async function(){
    let config = configModule.getConfig();
    let url = config ["db-spec"] ["url"];
    let dbName = config ["db-spec"] ["dbName"];
    try{
        return new Promise((resolve, reject) =>
                           {connect(url, dbName, function(err){
                               if(err){
                                   console.log("Unable to conncet mongodb");
                                   console.log("Application Terminate here.");
                                   reject({err: err});
                                   process.exit(1);
                               } else{
                                   console.log("Database connected Successfuly!");
                                   resolve({err: false});
                               }
                           });
                           });
    }catch (e){
        throw new Error (e.message);
    }

};

/**
 * Insert function insert doc in mongodb.
 * NOTE: There is no condition check is done here,
 *       Everything is verified in service layer.
 * @params {object} doc
 * @params {function} callback
 */
exports.insert = async function(doc){
    let collName = getCollection();
    let db = get();
    let collection = db.collection(collName);
    return new Promise((resolve, reject) => {
        collection.insertOne(doc, (err, result) => {
            if(err){
                reject(rejectResponse(err));
            }else {
                resolve(resolveResponse(result));
            }
        });
    });

};


/**
 * findOne function find doc in mongodb.
 * NOTE: There is no condition check is done here,
 *       Everything is verified in service layer.
 * @params {object} query
 * @params {function} callback
 */
exports.findOne = async function(query){
    let collName = getCollection();
    let db = get();
    let collection = db.collection(collName);

    return new Promise ((resolve, reject) => {
        collection.findOne(query, (err, result) => {
            if(err){
                reject(rejectResponse(err));
            }else {
                resolve(resolveResponse(result));
            }

        });

    });
};
