module.exports = function(app, db, _) {

    app.post('/addGuest', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            var body = _.pick(req.body, 'first_name', 'middle_name', 'last_name', 'idCardNumber', 'email', 'phoneNumber',
                    'typeOfGuest', 'nameCompany', 'ico', 'dic', 'address', 'city', 'state');
            return db.guests.create(body);
        }).then((guest) => {
            res.status(200).send();
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

    app.post('/getGuests', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.guests.findAll({});
        }).then((guestsInstances) => {
            let result = [];
            guestsInstances.forEach((employee) => {
                result.push(employee.toPublicJSON());
            });
            res.status(200).json(result);
        }).catch((error) => {
            res.status(400).json(error);
        });
    });


    app.post('/editGuest', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.guests.findByID(req.body.id);
        }).then((employee) => {
            var valuesToUpdate = _.pick(req.body, 'first_name', 'middle_name', 'last_name', 'idCardNumber', 'email', 'phoneNumber',
                    'typeOfGuest', 'nameCompany', 'ico', 'dic', 'address', 'city', 'state');
            return employee.update(valuesToUpdate);
        }).then(() => {
            res.status(200).json();
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

}
