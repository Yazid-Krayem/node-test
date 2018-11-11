const http = require('http');
const router = require('./routers')

const server = http.createServer(router); 

server.listen(3000);