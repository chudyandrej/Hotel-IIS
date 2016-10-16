var db = require('./db.js');
var express = require('express');


var PORT = process.env.PORT || 3000;
var app = express();

app.get('/', function(req, res) {
    res.send('Todo API Root');
});



db.sequelize.sync({
    force: true
}).then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
