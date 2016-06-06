var fs = require('fs');
var http = require('http');
var server = http.createServer();
var m = require('mraa');

// socket.io
server.on('request', (req, res) => {
  let stream = fs.createReadStream('beebotte_client.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  stream.pipe(res);
});
var io = require('socket.io').listen(server);
server.listen(8000);

// intel edison
var myLed = new m.Gpio(15);
myLed.dir(m.DIR_OUT);
var ledState = true;

periodicActivity();

function periodicActivity() {
  myLed.write(ledState?1:0);
  ledState = !ledState;
  setTimeout(periodicActivity, 500);
}
