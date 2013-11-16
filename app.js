var http = require('http');
var path = require('path');
var express = require('express');
var hogan = require('hogan-express');
var routes = require('./routes');
var errors = require('./routes/errors.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 8081);
app.engine('html', hogan);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon(express.favicon(__dirname + '/public/images/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
// set up a basic error handler
app.use(errors.errorHandler)
// Apply router, keep this as last middleware
app.use(app.router);

// development environments only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Index route
app.get('/', routes.index);
// A Route for Creating a 500 Error (Useful to keep around)
app.get('/500', errors.fiveHundy);
// The wildcard Route, aka 404 (ALWAYS Keep this as the last route)
app.get('/*', errors.fourOhFour);

server = http.createServer(app)

///////////////////////////////////////////
//           Socket.IO example           //
///////////////////////////////////////////

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {

    socket.on('message', function (data) {
        console.log('Message received');
        socket.emit('server_message', data);
    });

    socket.on('disconnect', function () {
        io.sockets.emit('user disconnected');
    });
});

///////////////////////////////////////////
//           Start Server                //
///////////////////////////////////////////
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

