const http = require('http');

const PORT = 3000;
const server = http.createServer((req, res) => {
    const url = req.url;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, ' + url + '!\n');
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});