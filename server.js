var db = require('./db.js');
var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser');
var cors = require('cors');

var PORT = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json());
app.use(cors());


require('./backend_api/login_logout.js')(app, db, _);
require('./backend_api/employe.js')(app, db, _);
require('./backend_api/room.js')(app, db, _);
require('./backend_api/service.js')(app, db, _);
require('./backend_api/guest.js')(app, db, _);
require('./backend_api/stay.js')(app, db, _);




app.get('/', function(req, res) {

    res.send('Todo API Roddddot');
});


setInterval(function() {
    db.tokens.tokensTimeoutWatchdog();
}, 1000 * 120);


db.sequelize.sync({
    //   force: true
}).then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
