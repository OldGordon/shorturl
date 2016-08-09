var express = require('express'),
    rand = require('random-key'),
    valid = require('valid-url'),
    path = require('path'),
    assert = require('assert'),
    dburl = require( '../../models/dburl.js'),
    router = express.Router();

router.get('/*', function(req, res) {
          var isUrl = new RegExp(
          "^" +
            // protocol identifier
            "(?:(?:https?|ftp)://)" +
            // user:pass authentication
            "(?:\\S+(?::\\S*)?@)?" +
            "(?:" +
              // IP address exclusion
              // private & local networks
              "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
              "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
              "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
              // IP address dotted notation octets
              // excludes loopback network 0.0.0.0
              // excludes reserved space >= 224.0.0.0
              // excludes network & broacast addresses
              // (first & last IP address of each class)
              "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
              "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
              "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
            "|" +
              // host name
              "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
              // domain name
              "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
              // TLD identifier
              "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
              // TLD may end with dot
              "\\.?" +
            ")" +
            // port number
            "(?::\\d{2,5})?" +
            // resource path
            "(?:[/?#]\\S*)?" +
            "$", "i"    ),
          //thanks to dperini :

      url2short = req.url.substring(1),
      num_url= rand.generateDigits(4),
      urlroot = "http://www.urlabbre.herokuapp.com/",
      response = {
                  original_url: url2short,
                  short_url: urlroot + num_url
                 };
    if(!isUrl.test(url2short)){
      res.json({error:"URL not valid"});
       } else {
              dburl.url_find(url2short, function(result){
                if (result){
                 response.short_url = urlroot + result.num_url;
                 console.log(result.num_url + " desde new si existe");
                 res.json(response);
                 } else {
                   dburl.url_insert(response.original_url, num_url);
                   res.json(response);
                 }
              });


         }
    });
module.exports = router;
