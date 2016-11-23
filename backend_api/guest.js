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
            return db.stays.findAll({
                where: {
                    from: {
                        $or:[{$lte: timeFrom},{$lte: timeTo}]
                    },
                    to: {
                        $or:[{$gte: timeFrom},{$gte: timeTo}]
                    },
                    status: {
                        $in: ['reservation', 'inProgress']
                    }
                },
                include: [db.guests]
            });
        }).then((stayEmployeesInstances) => {
            let result = [];
            stayEmployeesInstances.forEach((stayEmployee) => {
                result.push(stayEmployee.toPublicJSON());
            });
            res.status(200).json(result);
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


    app.post('/filterGuests', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.guests.findAll({
                where: {
                     $or: [
                         {
                             first_name: {
                                 $like: '%' + req.body.text + '%'
                            }
                        },{
                            middle_name: {
                                 $like: '%' + req.body.text + '%'
                            }
                        },{
                            last_name: {
                                 $like: '%' + req.body.text + '%'
                            }
                        },{
                            name_company: {
                                 $like: '%' + req.body.text + '%'
                            }
                        }
                    ]
                }
            });
        }).then((employeesInstances) => {
            result = [];
            for (employee of employeesInstances) {
                result.push(employee.toPublicJSON());
            }
            res.status(200).json(result);
        }).catch((error) => {
            res.status(400).json(error);
        });
    });








}
