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

[![Preview](https://i.imgur.com/Jb4Urrw.gif)](https://i.imgur.com/Jb4Urrw.gif)

File Cache:
---------------------

In large directories it can take several seconds to several minutes to generate an index, This is why file caching can be very useful.
Basic example of cache in use:

```javascript
app.use("/", exindex("public", {
    root  : "",
    cooldown : 10000, // 10 seconds
    cache : __dirname + "/public/view.html"
}));
```

This will only re-generate a file to `/public/view.html` every 10 seconds (if the route is requested).

Templates / Themes:
---------------------

I've taken the liberty to create four templates. These are `default`, `default-compact`, `default-night` and `default-night-compact`.
To change the template just specify the name in the config.

```javascript
app.use("/", exindex("public", {
    template : "default-night",
    root  : ""
}));
```


Blacklist files and directories:
---------------------

Not yet reimplemented, I need to give this some more thought..

**Additional Notes**
- Please report any issues [here](https://github.com/DrKain/express-index/issues)