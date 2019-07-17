var express = require('express');
var exindex = require('../index');
var app     = express();

// Custom error messages / handler
var options = {
    error : {
        // Not Found
        404 : function(req, res){
            res.send(req.url + " - Resource not found!");
        },
        // Forbidden
        403 : function(req, res){
            res.send("You shall not pass!");
        }
    }
};

// Multiple Themes
app.use("/theme-default", express.static("public"));
app.use("/theme-default", exindex( "public", options ));

app.use("/theme-default2", express.static("public"));
app.use("/theme-default2", exindex( "public", { theme : 'default-noimg' } ));

app.use("/theme-hackerman", express.static("public"));
app.use("/theme-hackerman", exindex( "public", { theme : 'hackerman' } ));

app.use("/theme-boxy", express.static("public"));
app.use("/theme-boxy", exindex( "public", { theme : 'boxy' } ));

app.use("/theme-darko", express.static("public"));
app.use("/theme-darko", exindex( "public", { theme : 'darko' } ));

app.get("/", function(req, res){
    res.send([
        "<div><a href='/theme-default'>theme-default</a></div>",
        "<div><a href='/theme-default2'>theme-default (no images)</a></div>",
        "<div><a href='/theme-darko'>theme-darko</a></div>",
        "<div><a href='/theme-hackerman'>theme-hackerman</a></div>",
        "<div><a href='/theme-boxy'>theme-boxy</a></div>"
    ].join("<br/>"));
});

app.listen(80);