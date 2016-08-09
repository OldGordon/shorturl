var express = require('express'),
    path = require('path'),
    assert = require('assert'),
    router = express.Router(),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./controllers/index'));
app.use('/new', require('./controllers/newUrl/new'));



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('That page is not here');
    err.status = 404 + " mira bien lo que haces carapapa";
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
