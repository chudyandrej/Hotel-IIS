module.exports = function(app, db, _) {

    app.post('/addNewService', function(req, res) {
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
            var body = _.pick(req.body, 'name', 'actual_price', 'description', 'available', 'duration');
            return db.templateServices.create(body);
        }).then((serviceInstance) => {
            res.status(200).send();
        }).catch((error) => {
            res.status(400).json(error);
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
            res.status(400).json(error);
        });
    });


    app.post('/editService', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.templateServices.findByID(req.body.id);
        }).then((serviceInstance) => {
            var body = _.pick(req.body, 'name', 'actual_price', 'description', 'available', 'duration');
            return serviceInstance.update(body);
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

    app.post('/reserveService', function(req, res) {
        db.employees.findByToken(req.body.token).then((instanceEmplyee) => {
            var body = _.pick(req.body, 'price_service', 'roomId', 'templateServiceId');
            body.employeeId = instanceEmplyee.get('id');
            return db.services.create(body);
        }).then((serviceInstance) => {
            res.status(200).send();
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

    app.post('/removeInstanceService', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return new Promise((resolve, reject) => {
                db.services.findById(req.body.id).then((instance) => {
                    if (!instance){
                        reject({
                            errors:[{message: "Service whit this ID not exist ! "}]
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
            res.status(400).json(error);
        });

    });


}
