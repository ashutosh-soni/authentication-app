const MongoClient = require("mongodb").MongoClient;
const configModule = require("../config/config.js");

var state = {db:null};

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
}

function get(){
    return state.db;
}

init = async function(){
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

insert = async function(doc){
    let collName = configModule.getConfig() ["db-spec"] ["collName"];

    try{
        let db = get();
        var collection = db.collection(collName);
        if (data != null){
            collection.insertOne(doc, function(err, result){
                if (err) {
                    console.log("Sorry data insertion failed", err);
                    return err;}
                console.log("Data is inserted successfully!", result);});
        }
    }catch(e) {
        throw new Error(e.message);}

}

module.exports = {init, insert, get};
