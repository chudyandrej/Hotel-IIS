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


    app.post('/getAvailableServices', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.templateServices.findAll({
                available: true
            });
        }).then((servicesInstances) => {
            let result = [];
            servicesInstances.forEach((service) => {
                result.push(service.toJSON());
            });
            res.status(200).json(result);
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

    app.post('/editService', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.templateServices.findByID(req.body.id);
        }).then((service) => {
            var body = _.pick(req.body, 'name', 'actualPrice', 'description', 'available', 'duration');
            return service.update(body);
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

}
