const http = require('http');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const mime = require('mime');

const PORT = 3000;
const server = http.createServer((req, res) => {
    let url = req.url;
    if (url == '/') {
        renderEJs(res, './views/index.ejs');
    }
    else if (url == '/media') {
        media(req, res);
    }
    else if (url == '/autor') {
        autor(req, res);
    }
    else {
        serveFiles(req, res);
    }
});

server.listen(PORT, () => { 
    console.log(`Server listening on port (${PORT}). Access http://localhost:${PORT}`);
});

const media = (req, res) => {
    let rawBody = '';
    req.on('data', (chunk) => {
        rawBody += chunk;
    });
    req.on('end', () => {
        console.log('raw   ', rawBody);
        let body = {};
        for (let variaveis of rawBody.split('&')) {
            let [variavel, valor] = variaveis.split('=');
            body[variavel] = valor;
        }
        console.log('parsed', body);
        
        renderEJs(res, './views/media.ejs', {body});
    });
}
const autor = (req, res) => {
    renderEJs(res, './views/autor.ejs');
}

const serveFiles = (req, res) => {
    let url = req.url;
    let publicFolder = __dirname + '/public/'
    try {
        let filePath = path.normalize(publicFolder + url).replace(/^(\.\.[\/\\])+/, '');;
        if (filePath.startsWith(publicFolder)) {
            let contentType = mime.getType(filePath);
            let fileData = fs.readFileSync(filePath);
            res.writeHead(200, {'Content-Type': contentType});
            res.write(fileData);
            res.end();
        }
        else {
            res.writeHead(403);
            res.write('Forbidden!');
            res.end();
        }
    } catch (e) {
        console.log(e);
        res.writeHead(404);
        res.write('File not found!' + e);
        res.end();
    }
}

const renderEJs = (res, arquivo, dados) => {
    try {
        let fileData = fs.readFileSync(arquivo, 'utf-8');
        let html = ejs.render(fileData, dados);
        res.writeHead(200, {'Content-Type': "text/html"});
        res.write(html);
        res.end();
    } catch (e) {
        console.log(e);
        res.writeHead(404);
        res.write(e.message);
        res.end();
    }
}