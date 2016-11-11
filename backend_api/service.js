module.exports = function(app, db, _) {

    app.post('/addNewService', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            var body = _.pick(req.body, 'name', 'actualPrice', 'description', 'available', 'duration');
            return db.templateServices.create(body);
        }).then((serviceInstance) => {
            res.status(200).send();
        }).catch((error) => {
            res.status(400).json(error);
        });
    });


    app.post('/getServices', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.templateServices.findAll();
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
            var body = _.pick(req.body, 'name', 'actualPrice', 'description', 'available', 'duration');
            return serviceInstance.update(body);
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

}
