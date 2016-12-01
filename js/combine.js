var fs = require('fs');
var http = require('http');
var server = http.createServer();
var m = require('mraa');

//variable
let ledState = false;

// socket.io
server.on('request', (req, res) => {
  let stream = fs.createReadStream('beebotte_client.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  stream.pipe(res);
});
var io = require('socket.io').listen(server);
server.listen(8000);

io.on('connection', (socket) => {
  socket.emit('start', { massage: 'websocket started!!' });
  socket.on('send_c_to_s', (data) => {
    console.log(data);
    if(data.message == '1ds11176w@gmail.com') {
      ledState = true;
      EdisonFunc();
    } else {
      ledState = false;
      EdisonFunc();
    }
  });
});

//intel edison
var EdisonFunc = () => {
  var myLed = new m.Gpio(14);
  myLed.dir(m.DIR_OUT);
  myLed.write(ledState?1:0);
}
