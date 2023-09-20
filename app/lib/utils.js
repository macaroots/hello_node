const fs = require('fs');
const ejs = require('ejs');
const { rejects } = require('assert');

const utils = {
    renderEJs: (res, arquivo, dados) => {
        try {
            const fileData = fs.readFileSync(arquivo, 'utf-8');
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
    },

    parseBody: (req) => {
        return new Promise((resolve) => {
            let rawBody = '';
            req.on('data', (chunk) => {
                rawBody += chunk;
            });
            req.on('end', () => {
                console.log('raw   ', rawBody);
                let body = utils.urlDecode(rawBody);
                console.log('parsed', body);

                resolve(body);
            });
        })
    },

    /**
     * Converte do formato chave1=valor1&chave2=valor2 para JSON
     * @param {string} urlEncoded 
     * @returns object
     */
    urlDecode: (urlEncoded) => {
        let json = {};
        for (let variaveis of urlEncoded.split('&')) {
            let [variavel, valor] = variaveis.split('=');
            json[variavel] = valor;
        }
        return json;
    },

    send: (res, texto, status=200) => {
        res.writeHead(status, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
        res.write(texto);
        res.end();
    },

    sendJson: (res, dados, status=200) => {
        res.writeHead(status, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
        res.write(JSON.stringify(dados));
        res.end();
    }
};

module.exports = utils;