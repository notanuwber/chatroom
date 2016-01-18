var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configure route
var routes = require('./routes/index');
var signIn = require('./routes/signIn');
var history = require('./routes/history');
app.use('/', routes);
app.use('/signIn', signIn);
app.use('/history', history);

var database = require(__dirname + '/models/db');

// configure socket
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    // new user enter
    socket.on("enter", function (object) {
        socket.name = object.user;
        socket.broadcast.emit("enter", object);
    });

    // some user send message
    socket.on('say', function (object) {
        database.save(object);
        socket.broadcast.emit('say', object);
    });

    // some user exit
    socket.on('disconnect', function () {
        if (socket.name != "undefined") {
            socket.broadcast.emit('exit', {user: socket.name});
        }
    });
});

app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'));

module.exports = app;