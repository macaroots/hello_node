const utils = require("../lib/utils");
const jwt = require('jsonwebtoken');

class AuthController {
    constructor(usuariosDao, jwtSecret) {
        this.usuariosDao = usuariosDao;
        this.JWT_SECRET = jwtSecret;
    }
    async login(req, res) {
        let body = await utils.parseBody(req);
        let nome_usuario = body.usuario;
        let senha = body.senha;
        const usuario = this.usuariosDao.autenticar(nome_usuario, senha);
        if (usuario) {
            const token = this.criarToken(usuario);
            utils.sendJson(res, { token });
        }
        else {
            utils.send(res, "Usuário ou senha inválidos!", 401);
        }
    }
    
    autenticar(req, res, next) {
        console.log('Autenticando', req.headers);
        const token = req.headers.authorization;

        if (!token) {
            return utils.send(res, 'Autenticação falhou: sem token', 401);
        }
    
        try {
            let decoded = jwt.verify(token, this.JWT_SECRET);
            // Adiciona a informação do usuário decodificada à requesição
            req.usuario = decoded;
            console.log({decoded});
            // Executa a próxima função
            next(req, res);
        } 
        catch {
            utils.send(res, 'Autenticação falhou: token inválido', 401);
        }

    }
    
    criarToken(usuario) {
        const payload = {
          id: usuario.id,
          nome: usuario.nome,
          nome_usuario: usuario.nome_usuario,
        };
        const token = jwt.sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }

}

module.exports = AuthController;