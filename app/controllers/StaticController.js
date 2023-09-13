const fs = require('fs');
const path = require('path');
const mime = require('mime');
const utils = require('../lib/utils');

class StaticController {
    staticFiles(req, res) {
        const url = req.url;
        const publicFolder = '/home/node/app/public/'
        try {
            const filePath = path.normalize(publicFolder + url).replace(/^(\.\.[\/\\])+/, '');;
            if (filePath.startsWith(publicFolder)) {
                const contentType = mime.getType(filePath);
                const fileData = fs.readFileSync(filePath);
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
            res.writeHead(404);
            res.write('File not found!');
            res.end();
        }
    }
}

module.exports = StaticController;