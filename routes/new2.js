var express = require('express');
var rand = require('random-key');
var valid = require('url-valid');
var mongodb = require('mongodb');
var assert = require('assert');
var router = express.Router();

var MongoClient = mongodb.MongoClient;
process.env.MONGOLAB_URI = 'mongodb://toni55:123Abc@ds029585.mlab.com:29585/heroku_nxwpshrb';
var urldb = process.env.MONGOLAB_URI;
//console.log(urldb);

MongoClient.connect(urldb, function (err, db) {
  var docs = db.collection('shorturl');
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to MongoDB mLab');
    router.get('/*', function(req, res) {
      var url2short = req.url.substring(1),
          num_url= rand.generateDigits(4),
          urlroot = "http://www.urlabbre.herokuapp.com/",
          response = {
                      original_url: url2short,
                      short_url: urlroot + num_url
                     };
      valid(url2short, function(err, valid){
        valid ?  res.json(response) : res.json({error:"URL not valid"});
        console.log(url2short,valid);
      });//end valid
      if(){}//controlar si existe ya la página
      docs.insert({
        original_url:url2short,
        num_url: parseInt(num_url)
      },function(err, result){
        assert.equal(null, err);
        console.log(result.value);
      });
    });// end router
  }
});
module.exports = router;