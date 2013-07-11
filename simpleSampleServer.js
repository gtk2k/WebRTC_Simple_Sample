// WebSocketの仕様においては、ポートは80またはTLSの場合は443ポート(HTTP/HTTPSと同じです)を使用することとなっていますが、
// そのほかのポートを使用しても接続可能です。
var io = require('socket.io').listen(9000);

io.sockets.on('connection', function (socket) {
  socket.on('login', function () {
    // broadcast.emitメソッドは、送信元クライアントを除く全クライアントに送信するメソッドで、
    // 簡略化のためにこれを利用してます。
    socket.broadcast.emit('login');
  });
  socket.on('sdp', function (sdp) {
    socket.broadcast.emit('sdp', sdp);
  });
  socket.on('ice', function (candidate) {
    socket.broadcast.emit('ice', candidate);
  });
  socket.on('disconnect', function () { });
});