# Live Chat Demo

### React + Express + Socket.IO + Material UI

## Socket.IO

### emit

```js
<script src="/socket.io/socket.io.js"></script>
<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script>
  $(function () {
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
  });
</script>
```

### on

```js
io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
  });
});
```

Sometimes, you might want to get a callback when the client confirmed the message reception.

To do this, simply pass a function as the last parameter of .send or .emit. What’s more, when you use .emit, the acknowledgement is done by you, which means you can also pass data along:

### Server (app.js)

```js
var io = require('socket.io')(80);

io.on('connection', function(socket) {
  socket.on('ferret', function(name, fn) {
    fn('woot');
  });
});
```

### Client (index.html)

```js
<script>
  var socket = io(); // TIP: io() with no args does auto-discovery
  socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
    socket.emit('ferret', 'tobi', function (data) {
      console.log(data); // data will be 'woot'
    });
  });
</script>
```
