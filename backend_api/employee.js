module.exports = function(app, db, _) {

    //Create guests
    app.post('/registration', function(req, res) {
        // db.employees.findByToken(req.body.token).then((instanceEmplyee) => {
        //     return new Promise((resolve, reject) => {
        //         if (instanceEmplyee.get('permissions') === 'root'){
        //             resolve();
        //         } else {
        //             reject({
        //                 errors:[{message: "Access denied! "}]
        //             });
        //         }
        //     });
        // }).then(() => {
        var body = _.pick(req.body, 'first_name', 'middle_name', 'last_name', 'email', 'password',
        'permissions', 'address', 'city', 'state', 'phone_number', 'iban');
        body.currently_employed = true;
        db.employees.create(body).then((user) => {
            res.status(200).send();
        }, (error) => {
            res.status(400).json(error);
        });
    });


    //Get all employees
    app.post('/getEmployees', function(req, res) {
        db.employees.findByToken(req.body.token).then((instanceEmplyee) => {
            return new Promise((resolve, reject) => {
                if (instanceEmplyee.get('permissions') === 'root'){
                    resolve();
                } else {
                    reject({
                        errors:[{message: "Access denied! "}]
                    });
                }
            });
        }).then(() => {
            let currently_employed;

            if (_.isUndefined(req.body.currently_employed)){
                currently_employed = true
            } else {
                currently_employed = req.body.currently_employed;
            }
            return db.employees.findAll({
                where: {
                    currently_employed
                }
            });
        }).then((employeesInstances) => {
            let result = [];
            employeesInstances.forEach((employee) => {
                result.push(employee.toPublicJSON());
            });
            res.status(200).json(result);
        }).catch((error) => {
            res.status(400).json(error);
        });
    });




    app.post('/deleteEmployee', function(req, res) {
        db.employees.findByToken(req.body.token).then((instanceEmplyee) => {
            return new Promise((resolve, reject) => {
                if (instanceEmplyee.get('permissions') === 'root'){
                    resolve();
                } else {
                    reject({
                        errors:[{message: "Access denied! "}]
                    });
                }
            });
        }).then(() => {
            return db.employees.findByID(req.body.id);
        }).then((employeeInstance) => {
            return employeeInstance.update({
                currently_employed: false
            });
        }).then(() => {
            res.status(200).json();
        }).catch((error) => {
            res.status(400).json(error);
        });
    });


    app.post('/editEmployee', function(req, res) {
        db.employees.findByToken(req.body.token).then((instanceEmplyee) => {
            return new Promise((resolve, reject) => {
                if (instanceEmplyee.get('permissions') === 'root'){
                    resolve();
                } else {
                    reject({
                        errors:[{message: "Access denied! "}]
                    });
                }
            });
        }).then(() => {
            return db.employees.findByID(req.body.id);
        }).then((employee) => {
            var valuesToUpdate = _.pick(req.body, 'first_name', 'middle_name', 'last_name', 'email',
            'password', 'permissions', 'address', 'city', 'state', 'phone_number', 'iban');
            return employee.update(valuesToUpdate);
        }).then(() => {
            res.status(200).json();
        }).catch((error) => {
            res.status(400).json(error);
        });
    });





};
