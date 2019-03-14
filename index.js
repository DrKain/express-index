var fs      = require('fs');
var path    = require('path');

function formatBytes(a, b) {
    if (0 === a) return "0 Bytes";
    var c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
}

function deepreaddirSync(src, config){
    var map = {};
    fs.readdirSync(src).map(function(file){
        var stat = fs.statSync(path.join(src, file));
        if(stat && stat.isDirectory() === true){
            map[file] = deepreaddirSync(path.join(src, file), config);
        } else{
            map[file] = {
                loc     : path.relative(config['location'], path.join(src, file)),
                size    : stat.size,
                size_f  : formatBytes(stat.size),
                mtime   : stat['mtime'], // modified
                ctime   : stat['ctime'] // created
            };
        }
    });
    return map;
}

var _match = {
    'json'      : 'fs',
    'ejs'       : 'ejs',
    'ejs-dark'  : 'ejs'
};

module.exports = function(location, config){
    config = Object.assign({
        render : "json",
        template : null,
        location : location
    }, config);

    // Actual render logic
    var renderFile = {
        "json" : function(res, data){
            res.json(data.exindex);
        },
        "ejs" : function(res, data, template){
            if(!template) template = path.join(__dirname, "templates/index.ejs");
            require('ejs').renderFile(template, data, null, function(err, str){
                if(!err) res.send(str);
                else throw new Error(err);
            });
        },
        "ejs-dark" : function(res, data, template){
            if(!template) template = path.join(__dirname, "templates/index-dark.ejs");
            renderFile['ejs'](res, data, template);
        }
    };

    function verifyEngine(eng){
        try{
            require.resolve(_match[eng]);
            return true;
        } catch(e){
            return false;
        }
    }

    // Handle route
    return function(req, res, next){
        var data        = { exindex : deepreaddirSync(location, config) };
        if( verifyEngine(config['render']) === true ) {
            renderFile[config['render']](res, Object.assign({
                ex_title : req.originalUrl
            }, data), config['template']);
        } else res.send("Invalid render engine specified: " + config['render'] + ". Please make sure the module is installed and supported")
    }
};