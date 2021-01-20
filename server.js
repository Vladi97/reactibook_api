const http = require('http');
const app = require('./app')
var socketIO = require('socket.io');

const server = http.createServer(app);

const port = process.env.PORT || 3080;

console.log('Server listening on port: ' + port);

server.listen(port);

const io = socketIO(server);

io.on('connection', (socket) => {
    socket.on('postMarker', () => {
       io.emit('post_added', 'Post updated');
    });
});