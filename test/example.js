var express = require('express');
var exindex = require('../index');
var app     = express();

app.use(express.static("public"));
app.use("/", exindex("public", { pass : true }), function(req, res){
    res.send("Generated");
});

app.listen(80);