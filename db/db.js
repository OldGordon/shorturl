var mongodb = require('mongodb').MongoClient,
    assert = require('assert');

process.env.MONGOLAB_URI = '';
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
