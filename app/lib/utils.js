const fs = require('fs');
const ejs = require('ejs');

const renderEJs = (res, arquivo, dados) => {
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
}

/**
 * Converte do formato chave1=valor1&chave2=valor2 para JSON
 * @param {string} urlEncoded 
 * @returns object
 */
const urlDecode = (urlEncoded) => {
    let json = {};
    for (let variaveis of urlEncoded.split('&')) {
        let [variavel, valor] = variaveis.split('=');
        json[variavel] = valor;
    }
    return json;
}
module.exports = {renderEJs, urlDecode};