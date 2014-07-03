var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , socketio = require('socket.io')
  , webRTCio = require('webrtc.io');


var app = express();

app
  .set('port', process.env.PORT || 3000)
  .set('views', __dirname + '/views')
  .set('view engine', 'jade')
  .use(express.favicon())
  .use(express.logger('dev'))
  .use(express.bodyParser())
  .use(express.methodOverride())
  .use(express.cookieParser('your secret here'))
  .use(express.session())
  .use(app.router)
  .use(require('less-middleware')({ src: __dirname + '/public' }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.errorHandler())
  .get('/', routes.index)
  .get('/users', user.list)
  .get('/drone', routes.drone)
  .get('/drone2', routes.drone2)
  .get('/drone3', routes.drone3)
  .get('/controller', routes.controller)
  .get('/controller2', routes.controller2)
  .get('/controller3', routes.controller3)
  .get('/controller4', routes.controller4);

var server = http.createServer(app);

server
  .listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });


var io = socketio.listen(server);
var sockets = [];

io
  .set("log level", 3)
  .sockets.on('connection', function (socket) {
    sockets.push(socket);

    socket.emit("OnConnect", {
      Sender: "Server",
      UID: sockets.length-1});

    socket.on('emit', function (data) {
      console.log("emit", data);
      if(sockets[data.Receiver]){
        sockets[data.Receiver].emit(data.ID, data);
      }
    });

    socket.on('broadcast', function (data) {
      console.log("broadcast", data);
      socket.broadcast.emit(data.ID, data);
    });

  });


var rtc = webRTCio.listen(8001);

