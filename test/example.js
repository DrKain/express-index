var express = require('express');
var exindex = require('../index');
var app     = express();

app.use("/", express.static("public"));
app.use("/", exindex("public"));

app.listen(80);