var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Handlers = require('./handlers');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  io.emit('user connected', 'a new user connected');
  const { getAvailableUsers, getChatRooms } = Handlers();

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    io.emit('user disconnected', 'a user disconnected');
  });

  socket.on('availableUsers', getAvailableUsers);
  socket.on('chat rooms', getChatRooms);
});

http.listen(3001, function() {
  console.log('listening on *:3001');
});
