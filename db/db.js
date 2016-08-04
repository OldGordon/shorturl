var MongoClient = mongodb.MongoClient;
process.env.MONGOLAB_URI = 'mongodb://toni55:123Abc@ds029585.mlab.com:29585/heroku_nxwpshrb';
var urldb = process.env.MONGOLAB_URI;
//console.log(urldb);
module.exports.connect = function connect(callback){
  MongoClient.connect(urldb, function(err, conn){
    module.exports.db = conn;
    callback(err);
  });
};
