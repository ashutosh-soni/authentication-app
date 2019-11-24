const MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

var state = {db:null};
var dbName = "authentication-app";
var collName = "accounts";


var connect = function(url, done){
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
    return new Promise((resolve, reject) =>
                       {connect(url, function(err){
                           if(err){
                               console.log("Unable to conncet mongodb");
                               reject({err: err});
                               // process.exit(1);
                           } else{
                               console.log("Database connected Successfuly!");
                               resolve({err: false});
                           }
                       });
                       });

};

insert = async function(doc){
    try{
        const db = get();
        var collection = db.collection(collName);
        if (data != null){
            collection.insertOne(doc, function(err, result){
                if (err) { console.log("Sorry data insertion failed", err)
                           return err};
                console.log("Data is inserted successfully!", result);});
        }
    }catch(e) {
        throw new Error(e.message);}

}

module.exports = {init, insert, get};
