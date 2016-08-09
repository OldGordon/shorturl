var mongo = require ('../db/db.js'),
    assert = require('assert');

module.exports.url_insert = function(url2short, num_url){
                mongo.connect(function (err) {
                  mongo.db.collection('shorturl').insert({
                              original_url:url2short,
                              num_url: parseInt(num_url)},
                              function(err, result){
                                    assert.equal(null, err);
                              });
                      });
                };
module.exports.url_find = function(item, callback){
                mongo.connect(function (err) {
                  mongo.db.collection('shorturl').find({$or:[{'original_url': item},{'num_url': item}]}).next(
                           function(err, result){
                             if (err){
                              assert.equal(null, err);
                             }
                             if (result) {
                              callback(result);
                             } else {
                              callback(false);
                            }
                       });
                });
 };
