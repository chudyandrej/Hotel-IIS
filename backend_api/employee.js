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
            let errorMsg = error.errors[0].message + " -> " + error.errors[0].path;
            if (!error.errors[0].message || !error.errors[0].path) {
                errorMsg = error;
            }
            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json({
                message : errorMsg
            });
        });
    });


    //Get all employees
    app.post('/getEmployees', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.employees.findByToken(req.body.token);
        }).then((instanceEmplyee) => {
            return new Promise((resolve, reject) => {
                if (instanceEmplyee.get('permissions') === 'root'){
                    resolve();
                } else {
                    reject({
                        message: "Access denied!"
                    });
                }
            });
        }).then(() => {
            let currently_employed = _.isUndefined(req.body.currently_employed) ? true : req.body.currently_employed
            let text = _.isUndefined(req.body.text) ? '' : req.body.text
            return db.sequelize.query("select id, first_name, middle_name, last_name, email, permissions, phone_number, address, city, state " +
                                      "from employees where currently_employed  = " +  currently_employed + " and" +
                                      " (concat_ws(' ', first_name, last_name) LIKE '%" + text + "%' OR" +
                                      " concat_ws(' ', last_name, first_name) LIKE '%"+ text + "%')", { type: db.sequelize.QueryTypes.SELECT});
        }).then((employeesInstances) => {
            res.status(200).json(employeesInstances);
        }).catch((error) => {
            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json(error);
        });
    });




    app.post('/deleteEmployee', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.employees.findByToken(req.body.token);
        }).then((instanceEmplyee) => {
            return new Promise((resolve, reject) => {
                if (instanceEmplyee.get('permissions') === 'root'){
                    resolve();
                } else {
                    reject({
                        message: "Access denied!"
                    });
                }
            });
        }).then(() => {
            return db.employees.findByID(req.body.id);
        }).then((employeeInstance) => {
            //TODO chaclk
            return employeeInstance.update({
                currently_employed: false
            });
        }).then(() => {
            res.status(200).json();
        }).catch((error) => {
            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json(error);
        });
    });


    app.post('/editEmployee', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.employees.findByToken(req.body.token);
        }).then((instanceEmplyee) => {
            return new Promise((resolve, reject) => {
                if (instanceEmplyee.get('permissions') === 'root'){
                    resolve();
                } else {
                    reject({
                        message: "Access denied!"
                    });
                }
            });
        }).then(() => {
            return db.employees.findByID(req.body.id);
        }).then((employee) => {
            var valuesToUpdate = _.pick(req.body, 'first_name', 'middle_name', 'last_name', 'email',
            'password', 'permissions', 'address', 'city', 'state', 'phone_number', 'iban');
            //TODO chack
            return employee.update(valuesToUpdate);
        }).then(() => {
            res.status(200).json();
        }).catch((error) => {

            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json(error);
        });
    });
};
