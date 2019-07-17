express-index
=============

[![NPM](https://nodei.co/npm/express-index.png?downloads=true)](https://nodei.co/npm/express-index/)

**What is this?***
------------------
express-index an express middleware used to generate simple and easy directory indexes.

Install
---------------------

```npm install --save express-index```

Usage
---------------------

```javascript
var express = require('express');
var exindex = require('express-index');
var app     = express();

app.use("/", express.static("public"));
app.use("/", exindex("public", { theme : "darko" }));

app.listen(80);
```

Custom Errors
---------------------

```javascript
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
```

Then pass the options to the route:

```javascript
app.use("/", express.static("public"));
app.use("/", exindex( "public", options ));
```

Templates / Themes:
---------------------


- default
- default-noimg
- hackerman
- darko
- boxy

**Additional Notes**
- Please report any issues [here](https://github.com/DrKain/express-index/issues)