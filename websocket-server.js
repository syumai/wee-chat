/**
 * Using official example code: https://github.com/theturtle32/WebSocket-Node#server-example
 */

const WebSocketServer = require('websocket').server;
const http = require('http');

const httpServer = http.createServer((request, response) => {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

httpServer.listen(8181, () => {
  console.log((new Date()) + ' Server is listening on port 8181');
});

wsServer = new WebSocketServer({
  httpServer,
  autoAcceptConnections: false
});

function originIsAllowed(origin) {
  return true;
}

let connections = [];
wsServer.on('request', (request) => {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  connections.push(connection);
  for (const _connection of connections) {
    _connection.sendUTF(JSON.stringify({
      name: "Server",
      message: "Joined new User"
    }))
  }
  console.log((new Date()) + ' Connection accepted.');
  console.log(`Currently connecting ${connections.length} users.`);
  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      connections.forEach((_connection) => {
        _connection.sendUTF(message.utf8Data);
      });
    }
    else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', (reasonCode, description) => {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    connections = connections.filter((_connection) => _connection !== connection);
  });
});
