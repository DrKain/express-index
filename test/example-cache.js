var express = require('express');
var exindex = require('../index');
var app     = express();

/*
    This way the file will be re-generated every 10 seconds. <br/>
    I made this because on a directory of 30k+ items it took about 3 minutes to generate.
*/

app.use(express.static("public"));
app.use("/", exindex("public", {
    root  : "",
    cooldown : 10000, // 10 seconds
    cache : __dirname + "/public/view.html"
}));

app.listen(3000);