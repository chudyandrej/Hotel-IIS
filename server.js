var db = require('./db.js');
var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser');
var cors = require('cors');
var moment = require('moment');

var PORT = process.env.PORT || 3000;
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());


require('./backend_api/login_logout.js')(app, db, _);
require('./backend_api/employee.js')(app, db, _);
require('./backend_api/room.js')(app, db, _);
require('./backend_api/service.js')(app, db, _);
require('./backend_api/guest.js')(app, db, _);
require('./backend_api/stay.js')(app, db, _);
require('./backend_api/checkInOut.js')(app, db, _);
require('./backend_api/statistics.js')(app, db, _);




setInterval(function() {
    db.tokens.tokensTimeoutWatchdog();
}, 1000 * 120);



setInterval(function() {
    db.stays.findAll().then((instances) =>{
        instances.forEach((stay) => {
            let time = moment(stay.get('from'), 'YYYY-MM-DDTHH:mm:ss.SSS');
            if (time.isBefore(moment()) && stay.get('status') === 'reservation'){
                stay.update({
                    status: 'canceled'
                });
            }
        });
    });
}, 1000 * 120);


db.sequelize.sync({
        //force: true
}).then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
