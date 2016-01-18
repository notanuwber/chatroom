var express = require('express');
var router = express.Router();
var path = require('path');
var db = require(__dirname + '/../models/db');

router.get('/', function (req, res, next) {
    db.show(function(err, rows) {
        res.json(rows);
    });
});

module.exports = router;