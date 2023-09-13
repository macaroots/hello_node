const http = require('http');
const EstudantesController = require('./controllers/EstudantesController');
const AutorController = require('./controllers/AutorController');
const StaticController = require('./controllers/StaticController');

estudantesController = new EstudantesController();
autorController = new AutorController();
staticController = new StaticController();

const PORT = 3000;
const server = http.createServer((req, res) => {
    let url = req.url;
    if (url == '/') {
        estudantesController.index(req, res);
    }
    else if (url == '/media') {
        estudantesController.media(req, res);
    }
    else if (url == '/autor') {
        autorController.index(req, res);
    }
    else {
        staticController.staticFiles(req, res);
    }
});

server.listen(PORT, () => { 
    console.log(`Server listening on port (${PORT}). Access http://localhost:${PORT}`);
});
