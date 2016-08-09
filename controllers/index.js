var express = require('express'),
    dburl = require( '../models/dburl.js'),
    router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'FreeCodeCamp API: URL Shortener' });

});
router.get('/:code', function(req, res) {
  var code = parseInt(req.params.code);
  dburl.url_find(code, function(result){
    console.log(result);
     if(result){
       res.redirect(result.original_url);
     }else{
       res.json({'error': 'Url is not in DataBase'});
     }
  });
});
module.exports = router;
