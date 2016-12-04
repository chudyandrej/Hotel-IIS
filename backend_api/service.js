module.exports = function(app, db, _) {

    app.post('/addNewService', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.employees.findByToken(req.body.token);
        }).then((instanceEmplyee) => {
            return new Promise((resolve, reject) => {
                if (instanceEmplyee.get('permissions') === 'root'){
                    resolve();
                } else {
                    reject({
                        message: "Access denied! "
                    });
                }
            });
        }).then(() => {
            var body = _.pick(req.body, 'name', 'actual_price', 'description',
            'available', 'duration', 'isDaily');
            return db.templateServices.create(body);
        }).then((serviceInstance) => {
            res.status(200).send();
        }).catch((error) => {
            if (_.isUndefined(error.errors)){
                error = {message: error.message}
            }
            if (!_.isUndefined(error.errors)){
                error =  {
                    message : error.errors[0].message + " -> " + error.errors[0].path
                };
            }
            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json(error);
        });
    });


    app.post('/getServices', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.templateServices.findAll({
                where: {
                    available: req.body.available
                }
            });
        }).then((servicesInstances) => {
            let result = [];
            servicesInstances.forEach((service) => {
                result.push(service.toPublicJSON());
            });
            res.status(200).json(result);
        }).catch((error) => {
            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json(error);
        });
    });


    app.post('/editService', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.templateServices.findByID(req.body.id);
        }).then((serviceInstance) => {
            var body = _.pick(req.body, 'name', 'actual_price', 'description',
            'available', 'duration', 'isDaily');
            return serviceInstance.update(body);
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            if (!_.isUndefined(error.errors)){
                error =  {
                    message : error.errors[0].message + " -> " + error.errors[0].path
                };
            }
            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json(error);
        });
    });

    app.post('/reserveService', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.employees.findByToken(req.body.token)
        }).then((instanceEmplyee) => {
            return db.services.createReservationService(instanceEmplyee.get('id'),req.body);
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json(error);
        });
    });

    app.post('/removeInstanceService', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return new Promise((resolve, reject) => {
                db.services.findById(req.body.id).then((instance) => {
                    if (!instance){
                        reject({
                            message: "Service with the identifier does not exist"
                        });
                    }
                    resolve(instance);
                },(error) => {
                    reject(error);
                });
            });
        }).then((serviceInstance) => {
            return serviceInstance.destroy()
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json(error);
        });

    });


}
