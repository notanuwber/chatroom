var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database');

db.run("CREATE TABLE IF NOT EXISTS history (time INTEGER, name VARCHAR(60), content TEXT)");

exports.show = function(callback) {
    db.all("SELECT * FROM history", callback); // callback must be function(err, rows)
};

exports.save = function(object) {
    var command = 'INSERT INTO history VALUES (' + object.time + ', "' + object.name + '", "' + object.content + '")';
    db.run(command);
};