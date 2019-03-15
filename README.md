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

Usage
---------------------

```javascript
var express = require('express');
var exindex = require('express-index');
var app     = express();

app.use(express.static("public"));
app.use("/", exindex("public", { root : "" }));

app.listen(3000);
```

Config `root` determines the root path that the files will be linked from.
Defaults to system path. You can also set the root to another website or drive, EG:

```javascript
app.use(exindex("public", { root : "https://website.com" });
```
Then the files will be linked like:  https://website.com/file/on/path.txt

Preview:
---------------------

##### (outdated, new preview coming soon)

[![Preview](https://i.imgur.com/u2pt0Kn.gif)](https://i.imgur.com/u2pt0Kn.gif)

Blacklist files and directories:
---------------------

Not yet reimplemented, I need to give this some more thought..

**Additional Notes**
- Please report any issues [here](https://github.com/DrKain/express-index/issues)