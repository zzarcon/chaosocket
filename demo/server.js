// const io = require('socket.io')(8888, { serveClient: false });
// const payload = {
//   name: 'hector',
//   lastName: 'zarco'
// };

// io.on('connection', function(socket) {
//   console.log('a user connected');

//   socket.on('disconnect', function() {
//     console.log('user disconnected');
//   });

//   setInterval(() => {
//     console.log('emit')
//     io.emit('tweet', payload);
//   }, 2000);
// });
// 
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});