var express = require('express'),
    path = require('path');
var express = require('express');
var rand = require('random-key');
var valid = require('url-valid');
var mongodb = require('mongodb');
var assert = require('assert');
var router = express.Router();

var MongoClient = mongodb.MongoClient;
process.env.MONGOLAB_URI = 'mongodb://toni55:123Abc@ds029585.mlab.com:29585/heroku_nxwpshrb';
var urldb = process.env.MONGOLAB_URI;
//  different files to route
var routes = require('./routes/index');
//var newurl = require('./routes/new');
//using express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', routes);
//app.use('/new', newurl);
MongoClient.connect(urldb, function (err, db) {
  var docs = db.collection('shorturl');
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to MongoDB mLab');

    router.get('/new/*', function(req, res) {
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
      //if(){}//controlar si existe ya la página
      docs.insert({
        original_url:url2short,
        num_url: parseInt(num_url)
      },function(err, result){
        assert.equal(null, err);
        console.log(result.value);
      });
    });// end router
  }

  router.get('/:code', function(req,res){
    console.log(code);
  })
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
