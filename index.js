var fs      = require('fs');
var path    = require('path');
var ejs     = require('ejs');
var _file   = require('file');
var moment  = require('moment');

function scanDir(target, _root_, blacklist){
    target = target.replace(/\\/g, '/');
    if(typeof _root_ === "undefined") _root_ = target;
    var outfiles = [];
    var uni = function(x){ return moment(x).unix() };
    // Walk through directory, return dirs and files
    _file.walkSync(target, function(dir, lvl, files){
        var valid   = true;
        // Predefine top level & root
        var top = { l : path.relative(path.join(target, '../'), dir).replace(/\\/g, '/'), s : 0, m : 0 };
        // Cycle through files
        files = files.map(function(file){
            var loc     = path.join(dir, file).replace(/\\/g, '/');

            var stat    = fs.statSync( loc );
            // Add top level stats
            if(top.s < stat.size) top.s += stat.size;
            if( uni(top.m) < uni(stat.mtime) ) top.m = stat.mtime;
            // Return compacted string
            return [
                path.join(_root_, path.relative(target, loc)).replace(/\\/g, '/'),
                moment(stat['mtime']).format("L LTS"),
                stat.size
            ].join("*");
            // Join files in same directory
        }).join("|");
        // Fix timestamp and skip empty files
        if(valid){
            files = [ top.l, moment(top.m).format("L LTS"), top.s ].join("*") + "|" + files;
            files.length > 0 ? outfiles.push(files) : null;
        }
    });

    return outfiles;
}

function compactJS(data){
    return data.map(function(line){
        return `D.push("${line}")`;
    }).join("\n").replace(/\\/g, '/');
}

module.exports = function(location, config){
    config = Object.assign({
        pass : false,
        root : null,
        name : 'Index of /' + path.basename(location),
        cooldown : 1000 * 60 * 10, // 10 minutes
        cache : null,
        template : "default",
        blacklist : [] // this won't be easy
    }, config);
    return function(req, res, next){
        if(!config.root) config.root = req.protocol + "://" + req.hostname + "/";
        var cacheready = false;

        var c = {
            extime : moment().format('L LTS'),
            exindex : compactJS( scanDir(location, config.root, config.blacklist) ),
            exname : config.name
        };

        if(config.cache !== null){
            if( fs.existsSync(config.cache) === true ){
                var now = moment().unix();
                var then = moment(fs.statSync(config.cache)['mtime']).unix();
                if((now - then) * 1000 >= config.cooldown) cacheready = true;
            } else cacheready = true;
        } else cacheready = true;

        if(cacheready === true){
            ejs.renderFile( path.join( __dirname, 'templates/' + config.template + '.ejs'), c, function(err, html){
                if(config.cache && cacheready === true) fs.writeFileSync(config.cache, html);
                config.pass ? next() : res.send(html);
            });
        } else{
            config.pass ? next() : res.sendFile(config.cache);
        }
    }
};