const utils = require('../lib/utils');
const Estudante = require('../models/Estudante');

class EstudantesController {
    constructor(estudantesDao) {
        this.estudantesDao = estudantesDao;
    }
    
    index(req, res) {
        utils.renderEJs(res, './views/estudantes/index.ejs');
    }

    async media(req, res) {
        let body = await utils.parseBody(req);

        let estudante = new Estudante(
            body.nome,
            parseInt(body.nota1),
            parseInt(body.nota2),
        );

        let dados = {
            nome: estudante.nome,
            nota1: estudante.nota1,
            nota2: estudante.nota2,
            media: estudante.getMedia(),
            situacao: estudante.getSituacao()
        };

        console.log('headers', req.headers);
        if (req.headers.accept == 'application/json') {
            utils.sendJson(res, dados);
        }
        else {
            utils.renderEJs(res, './views/estudantes/media.ejs', dados);
        }
    }

    async inserir(req, res) {
        try {
            let estudante = await this.getEstudanteFromRequest(req);
            estudante.id = this.estudantesDao.inserir(estudante);    
            utils.send(res, `Estudante #${estudante.id} criado com sucesso!`);
        } catch (e) {
            utils.sendJson(res, e.message, 400);
        }
    }

    async getEstudanteFromRequest(req) {
        let body = await utils.parseBody(req);

        let estudante = new Estudante(
            body.nome,
            parseInt(body.nota1),
            parseInt(body.nota2),
        );
        if (body.id) {
            estudante.id = body.id;
        }
        
        return estudante;
    }

    async listar(req, res) {
        let estudantes = this.estudantesDao.listar();
        
        estudantes = estudantes.map((estudante) => {
            return {
                id: estudante.id,
                nome: estudante.nome,
                nota1: estudante.nota1,
                nota2: estudante.nota2,
                media: estudante.getMedia(),
                situacao: estudante.getSituacao()
            };
        });

        utils.sendJson(res, estudantes);
    }

    async procurar(req, res) {
        try {
            let query = utils.urlDecode(req.url.split('?')[1]);
            let estudante = this.estudantesDao.procurar(query.id);
            
            let dados = {
                id: estudante.id,
                nome: estudante.nome,
                nota1: estudante.nota1,
                nota2: estudante.nota2,
                media: estudante.getMedia(),
                situacao: estudante.getSituacao()
            };
            utils.sendJson(res, dados);
        } catch (e) {
            console.log(e);
            utils.send(res, 'Estudante não encontrado!', 404);
        }
    }

    async alterar(req, res) {
        try {
            let estudante = await this.getEstudanteFromRequest(req);
            this.estudantesDao.alterar(estudante.id, estudante);
            utils.send(res, `Estudante #${estudante.id} alterado com sucesso!`);
        } catch (e) {
            utils.sendJson(res, e.message, 400);
        }
    }

    async apagar(req, res) {
        try {
            let id = utils.urlDecode(req.url.split('?')[1]).id;
            this.estudantesDao.apagar(id);
            utils.send(res, `Estudante #${id} apagado com sucesso!`);
        } catch (e) {
            utils.sendJson(res, e.message, 400);
        }
    }
}

module.exports = EstudantesController;