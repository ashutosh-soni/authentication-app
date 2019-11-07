const MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

var state = {db:null};


var connect = function(url, done){
    if (state.db) return done();
    MongoClient.connect(url,
                        {useUnifiedTopology: true,
                         useNewUrlParser: true},
                        function(err, client){
                            if(err) return done(err);
                            state.db = client;
                            done();
                        });
}

module.exports.get = function(){
    return state.db;
};

module.exports.init = function(){
    connect(url, function(err){
        if(err){
            console.log("Unable to conncet mongodb");
            process.exit(1);
        } else{
            console.log("Database connected Successfuly!");
        }
    });
};
