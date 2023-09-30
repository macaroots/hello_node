const http = require('http');
const EstudantesController = require('./controllers/EstudantesController');
const AutorController = require('./controllers/AutorController');
const StaticController = require('./controllers/StaticController');
const AuthController = require('./controllers/AuthController');
const EstudantesDAO = require('./models/dao/EstudantesDAO');
const UsuariosDAO = require('./models/dao/UsuariosDAO.js');
const Router = require('./lib/Router');

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET;

const router = new Router();
const estudantesDao = new EstudantesDAO();
const usuariosDao = new UsuariosDAO();
const estudantesController = new EstudantesController(estudantesDao);
const autorController = new AutorController();
const staticController = new StaticController();
const authController = new AuthController(usuariosDao, JWT_SECRET);

router.register('GET', '/', (req, res) => { estudantesController.index(req, res) });
router.register('POST', '/media', (req, res) => { estudantesController.media(req, res) });
router.register('GET', '/estudantes', (req, res) => { estudantesController.listar(req, res) });
router.register('GET', '/estudante', (req, res) => { estudantesController.procurar(req, res) });
router.register('POST', '/estudante', (req, res) => { 
    authController.autenticar(req, res, (req, res) => { estudantesController.inserir(req, res) }); 
});
router.register('PUT', '/estudante', (req, res) => {
    authController.autenticar(req, res, (req, res) => { estudantesController.alterar(req, res) });
});
router.register('DELETE', '/estudante', (req, res) => {
    authController.autenticar(req, res, (req, res) => { estudantesController.apagar(req, res) });
});

router.register('GET', '/autor', (req, res) => { autorController.index(req, res) });

router.register('POST', '/login', (req, res) => { authController.login(req, res) });

const server = http.createServer((req, res) => {
    let url = req.url.split('?')[0];
    let method = req.method;

    let requestHandler = router.getRequestHandler(method, url);
    console.log(new Date(), method, url, requestHandler?.toString());
    
    if (method == 'OPTIONS' || method == 'FETCH') {
        // Handle preflight requests (OPTIONS)
        res.writeHead(200, {
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Origin': '*'
        });
        res.end();
        return;
    }
    if (requestHandler != null) {
        requestHandler(req, res);
    }
    else {
        staticController.staticFiles(req, res);
    }
});

server.listen(PORT, () => { 
    console.log(`Server listening on port (${PORT}). Access http://localhost:${PORT}`);
});
