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






//#################   EMPLOYEES     ##################
// Registration employees
app.post('/join', function(req, res) {
    var body = _.pick(req.body, 'first_name', 'middle_name', 'last_name', 'email', 'password', 'permissions', 'address', 'city', 'state', 'phone_number', 'iban');
    body.currently_employed = true;
    db.employees.create(body).then((user) => {
        res.json(user.toJSON());
    }, (error) => {
        res.status(400).json(error);
    });
});

//Get all employees
app.post('/getAllEmployes', function(req, res) {
    db.tokens.findToken(req.body.token).then(() => {
        return db.employees.findAll({
            where: {
                currently_employed: true
            }
        });
    }).then((employeesInstances) => {
        let result = [];
        employeesInstances.forEach((employee) => {
            result.push(employee.toPublicJSON());
        });
        res.json(result);
    }).catch((error) => {
        res.json({
            status: 0,
            error
        });
    });
});

app.post('/deleteEmployee', function(req, res) {
    db.tokens.findToken(req.body.token).then(() => {
        return db.employees.findByWhere({
            id: req.body.id
        });
    }).then((employeeInstance) => {
        return employeeInstance.update({
            currently_employed: false
        });
    }).then(() => {
        res.json({
            status: 1
        });
    }).catch((error) => {
        res.json({
            status: 0,
            error
        });
    });
});

app.post('/editEmployee', function(req, res) {
    var valuesToUpdate = _.pick(req.body, 'first_name', 'middle_name', 'last_name', 'email', 'password', 'permissions', 'address', 'city', 'state', 'phone_number', 'iban');
    db.tokens.findToken(req.body.token).then(() => {
        console.log(req.body.id);
        return db.employees.findByEmployeeId(req.body.id);
    }).then((employee) => {
        return employee.update(valuesToUpdate);
    }).then(() => {
        res.json({
            status: 1
        });
    }).catch((error) => {
        res.json({
            status: 0,
            error
        });
    });
});






setInterval(function() {
    db.tokens.tokensTimeoutWatchdog();
}, 1000 * 120);


db.sequelize.sync({
    //force: true
}).then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
