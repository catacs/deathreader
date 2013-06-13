
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var routes = require('./routes');
var log4js = require('log4js');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var db;
var port = process.env.VCAP_APP_PORT || 3000;

//APP CONSTANTS
appName = "Death Reader";


  
DB = require('./database');
log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'log/reader.log', category: ['reader','console'] }
    ]
});

log = log4js.getLogger('reader');



app.configure('development', function(){
    mongo = {
        "hostname":"localhost",
        "port":27017,
        "username":"",
        "password":"",
        "name":"",
        "db":"Reader"
    }
});
app.configure('production', function(){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    mongo = env['mongodb-1.8'][0]['credentials'];
});


var mongoUrl = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'Reader');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}


// all environments
app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.favicon(__dirname + '/public/favicon.ico'));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(app.router);
});
var connection = mongoUrl(mongo);
db = new DB.open(connection);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var routes = require('./routes.js')(app);
io.on('connection', function(){ 
    socket.emit('hello', { hello: 'world' });
    socket.on('hello', function (data) {
        console.log(data);
    });
});

server.listen(port)

log.info('Express server listening on port ' + port);
