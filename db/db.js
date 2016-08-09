var mongodb = require('mongodb').MongoClient,
    assert = require('assert');

process.env.MONGOLAB_URI = 'mongodb://toni55:123Abc@ds029585.mlab.com:29585/heroku_nxwpshrb';
var urldb = process.env.MONGOLAB_URI;

//console.log(urldb);
module.exports.connect = function connect(callback){
  mongodb.connect(urldb, function(err, connected){
    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");
    module.exports.db = connected;
    callback(err);
  });
};
