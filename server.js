var db = require('./db.js');
var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser');


var PORT = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());


app.get('/', function(req, res) {


    res.send('Todo API Roddddot');
});


// Registration employees
app.post('/join', function(req, res) {
    var body = _.pick(req.body, 'first_name', 'middle_name', 'last_name', 'email', 'password', 'permissions', 'address', 'city', 'state', 'phone_number', 'iban');
    db.employees.create(body).then((user) => {
        res.json(user.toJSON());
    }, (error) => {
        res.status(400).json(error);
    });
});


//Log in
app.post('/login', function(req, res) {
    let body = _.pick(req.body, 'email', 'password');
    db.employees.authenticate(body).then((employee) => {
        return employee.generateToken('authentication');
    }).then((token) => {
        return db.tokens.create({
            token
        });
    }).then((tokenInstance) => {
        res.json({
            status: 1,
            token: tokenInstance.get("token")
        });
    }).catch((error) => {
        res.json({
            status: 0,
            error,
        });
    });
});

// logout user
app.post('/logout', function(req, res) {
    db.tokens.findToken(req.body.token).then((tokenInstance) => {
        return tokenInstance.destroy();
    }).then(() => {
        res.status(200).send();
    }).catch((error) => {
        res.status(500).send();
    });
});

app.get('/getEmployes', function(req, res) {
    res.send('Todo API Roddddot');
});



setInterval(function() {
    db.tokens.tokensTimeoutWatchdog();
}, 1000 * 120);


db.sequelize.sync({
    force: true
}).then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
