var fs          = require('fs');
var ejs         = require('ejs');
var path        = require('path');
var parseUrl    = require('parseurl');
var normalize   = path.normalize;
var sep         = path.sep;
var extname     = path.extname;
var join        = path.join;
var resolve     = path.resolve;

function getRequestedDir (req) {
    try {
        return decodeURIComponent(parseUrl(req).pathname)
    } catch (e) {
        console.error(e);
        return null
    }
}

// Vastly inspired and influenced by serve-index
// This is a simple alternative made for personal use
function exindex(root, options = {}) {

    options.theme   = options.theme || "default";
    var theme       = fs.readdirSync( join(__dirname, 'render/style') );
    var errhand     = options['error'] || {};

    if (!errhand[404]) errhand[404] = function (req, res) {
        res.status(404).send("404: Not Found");
    };

    if (!errhand[400]) errhand[400] = function (req, res) {
        res.status(400).send("400: Bad Request");
    };

    if (!errhand[403]) errhand[403] = function (req, res) {
        res.status(403).send("403: Forbidden");
    };

    if (!root) throw new TypeError('Root path required');
    var rootPath = normalize(resolve(root) + sep);

    return function (req, res, next) {
        var dir = getRequestedDir(req);
        if (dir === null) return errhand[400](req, res);
        var originalUrl = parseUrl.original(req);
        var originalDir = decodeURIComponent(originalUrl.pathname);
        var path = normalize(join(rootPath, dir));
        if (~path.indexOf('\0')) return errhand[400](req, res);
        if ((path + sep).substr(0, rootPath.length) !== rootPath) {
            return errhand[403](req, res);
        }

        var css         = ".no-style-defined{}";
        var html        = "";

        if(theme.indexOf(`${options.theme}.css`) > -1){
            css = fs.readFileSync(
                join(__dirname, `render/style/${options.theme}.css`)
            );
        }

        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file) {

                var loc = join(path, file);
                var data = fs.statSync(loc);

                data.name = file;
                data.type = extname(file).toLowerCase().replace(/./, '');
                if (data.isDirectory()) data.type = 'dir';

                ejs.renderFile(
                    join(__dirname, "render/file.ejs"),
                    {file: data},
                    {},
                    function (err, str) {
                        html += str;
                    }
                );

            });
        } else {
            return errhand[404](req, res);
        }

        res.render(
            join(__dirname, "render/directory.ejs"),
            {
                contents: html,
                indexName: dir,
                isRoot: rootPath === path,
                css : css
            }
        );
    };
}

module.exports = exindex;