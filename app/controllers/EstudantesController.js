const utils = require('../lib/utils');
const Estudante = require('../models/Estudante');

class EstudantesController {
    index(req, res) {
        utils.renderEJs(res, './views/estudantes/index.ejs');
    }

    media(req, res) {
        let rawBody = '';
        req.on('data', (chunk) => {
            rawBody += chunk;
        });
        req.on('end', () => {
            console.log('raw   ', rawBody);
            let body = utils.urlDecode(rawBody);
            console.log('parsed', body);

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

            utils.renderEJs(res, './views/estudantes/media.ejs', dados);
        });
    }
}

module.exports = EstudantesController;