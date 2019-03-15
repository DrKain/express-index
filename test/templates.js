var express = require('express');
var exindex = require('../index');
var app     = express();

app.use(express.static("public"));
// Available: default, default-compact, default-night, default-night-compact
app.use("/", exindex("public", {
    template : "default-night",
    root  : ""
}));

app.listen(3000);