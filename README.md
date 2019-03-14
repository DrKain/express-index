express-index
=============

[![NPM](https://nodei.co/npm/express-index.png?downloads=true)](https://nodei.co/npm/express-index/)

**What is this?***
------------------
express-index an express middleware used to generate simple, clean and configurable directory indexes.
It's incredibly easy to set up and use.

Install
---------------------

```npm install --save express-index```
##### Then EJS for the `ejs` template
```npm install --save ejs```

Usage
---------------------

```javascript
var express = require('express');
var exindex = require('express-index');
var app     = express();

app.use(express.static("public"));
app.use(exindex("public", { render : "ejs" }));

app.listen(3000);
```

Preview:
---------------------

##### Note, You can use `ejs-dark` for an alternative dark theme.

[![Preview](https://i.imgur.com/u2pt0Kn.gif)](https://i.imgur.com/u2pt0Kn.gif)

Custom Templates
---------------------

You can use your own render if you'd like, Simply specify the file in the options.

```javascript
app.use(exindex("public", {
    render : "ejs",
    template : "C:/path/to/template.ejs"
}));
```
Your custom template will be rendered instead of the default.
The variables passed to the file will be `exindex` - containing all the files and information, `ex_title` = `req.originalUrl`.


Supporting other view engines?
---------------------

Right now the only view engine supported is ejs. If you would like to add one please feel free to create a pull request, I would gladly accept the help.
Otherwise I'll add them as soon as I get around to it.

**Additional Notes**
- Please report any issues [here](https://github.com/DrKain/express-index/issues)