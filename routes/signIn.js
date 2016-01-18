var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, "/../views/signIn.html"));
});

var users = {};//store all online users
router.post('/', function (req, res, next) {
    if (users[req.body.username]) {
        res.redirect("/signIn");
    } else {
        res.cookie("user", req.body.name);
        res.redirect("/");
    }
});

module.exports = router;
