var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (typeof req.cookies.user === "undefined") {
        res.redirect("/signIn");
    } else {
        res.sendFile(path.join(__dirname, "/../views/index.html"));
    }
});

module.exports = router;
