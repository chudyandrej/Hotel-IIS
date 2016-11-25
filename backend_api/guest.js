var moment = require('moment');
module.exports = function(app, db, _) {

    app.post('/addGuest', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            var body = _.pick(req.body, 'first_name', 'middle_name', 'last_name', 'idcard_number', 'email', 'phone_number',
                    'type_of_guest', 'name_company', 'ico', 'dic', 'address', 'city', 'state');
            return db.guests.create(body);
        }).then((guest) => {
            res.status(200).send();
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

    app.post('/getCurrentGuests', function(req, res) {
        var timeFrom = req.body.from;
        var timeTo = req.body.to;
        db.tokens.findToken(req.body.token).then(() => {
            return new Promise((resolve, reject) => {
                if ((!_.isString(timeFrom) || !_.isString(timeTo)) || (moment(timeFrom) > moment(timeTo))){
                    reject({
                        errors:[{message: "Bad format of request"}]
                    });
                }
                else{
                    resolve();
                }
            });
        }).then(() => {
            let text = (_.isUndefined(req.body.text)) ? "" : req.body.text;
            return db.sequelize.query("SELECT guests.id, guests.first_name, guests.middle_name, guests.last_name, guests.idcard_number, guests.email, guests.phone_number, " +
                                     "guests.type_of_guest, guests.ico, guests.dic, guests.address, guests.city, guests.state " +
                                     "FROM stays " +
                                     "INNER JOIN guests " +
                                     "ON stays.guestId=guests.id " +
                                     "WHERE (stays.from <= '" + timeFrom + "' OR stays.to <= '" + timeTo + "') AND (stays.from >= '" + timeFrom + "' OR stays.to >= '" + timeTo + "') " +
                                        "AND (concat_ws(' ', guests.first_name, guests.last_name, guests.name_company) LIKE '%" + text + "%' OR " +
                                        "concat_ws(' ', guests.first_name, guests.last_name, guests.name_company) LIKE '%" + text + "%') " +
                                     "GROUP BY guests.id", { type: db.sequelize.QueryTypes.SELECT});
        }).then((stayEmployeesInstances) => {
            res.status(200).json(stayEmployeesInstances);
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

    app.post('/getGuestsStays', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return new Promise((resolve, reject) => {
                if (_.isUndefined(req.body.id)){
                    reject({
                        errors:[{message: "Bad format of request"}]
                    });
                } else {
                    resolve();
                }
            });
        }).then(() => {
            return db.stays.findAll({
                where: {
                    guestId : req.body.id
                },
                include: [db.invoices]
            });
        }).then((instances) => {
            result = []
            instances.forEach((instance) => {
                result.push(instance.toPublicJSON());
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
            var valuesToUpdate = _.pick(req.body, 'first_name', 'middle_name', 'last_name', 'idcard_number', 'email', 'phone_number',
                    'type_of_guest', 'name_company', 'ico', 'dic', 'address', 'city', 'state');
            return employee.update(valuesToUpdate);
        }).then(() => {
            res.status(200).json();
        }).catch((error) => {
            res.status(400).json(error);
        });
    });


    app.post('/getGuests', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            let text = (_.isUndefined(req.body.text)) ? "" : req.body.text;
            return db.sequelize.query("select id, first_name, middle_name, last_name, idcard_number, email, phone_number, type_of_guest, name_company, " +
                                      "ico, dic, address, city, state from guests WHERE concat_ws(' ', first_name, last_name, name_company) LIKE '%" + text + "%' OR"
                                      + " concat_ws(' ', last_name, first_name) LIKE '%" + text + "%'", { type: db.sequelize.QueryTypes.SELECT});
        }).then((employeesInstances) => {
            res.status(200).json(employeesInstances);
        }).catch((error) => {
            res.status(400).json(error);
        });
    });








}
