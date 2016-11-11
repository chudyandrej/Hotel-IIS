module.exports = function(app, db, _) {

    app.post('/addNewStay', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            var body = _.pick(req.body, 'form', 'to', 'status', 'note', 'employeeId', 'guestId');
            return db.stays.create(body)
        }).then((stateInstance) => {
            res.status(200).send();
        }, (error) => {
            res.status(400).json(error);
        });
    });

    app.post('/editStay', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.stays.findByID(req.body.id);
        }).then((stayInstance) =>{
            var body = _.pick(req.body, 'form', 'to', 'status', 'note', 'employeeId', 'guestId');
            return stayInstance.update(body);
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

    app.post('/getStays', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.stays.findAll({
                include: [db.employees, db.guests]
            });
        }).then((staysInstances) => {
            let result = [];
            staysInstances.forEach((stayInstance) => {
                result.push(stayInstance.toPublicJSON());
            });
            res.status(200).json(result);
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

    app.post('/stayFilter', function(req, res) {


    });




}
