const utils = require('../lib/utils');

class AutorController {
    index(req, res) {
        let nome = 'Renato';
        let formacoes = [
            {
                "ano": 2007,
                "curso": "Tecnologia em Telemática",
                "instituicao": "IFCE"
            },
            {
                "ano": 2009,
                "curso": "Mestrado em Ciência da Computação",
                "instituicao": "UECE"
            }
        ];
    
        utils.renderEJs(res, './views/autor.ejs', {nome, formacoes});
    }
}

module.exports = AutorController;