const http = require('http');
const app = require('./app')

const server = http.createServer(app);

const port = process.env.PORT || 3080;

console.log('Server listening on port: ' + port);

server.listen(port);