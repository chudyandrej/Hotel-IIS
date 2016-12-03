module.exports = function(app, db, _) {

    app.post('/addNewStay', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            var body = _.pick(req.body, 'from', 'to', 'status', 'note', 'employeeId', 'guestId');
            return db.stays.create(body)
        }).then((stateInstance) => {
            res.status(200).send();
        }, (error) => {
            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json(error);
        });
    });

    app.post('/editStay', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.stays.findByID(req.body.id);
        }).then((stayInstance) =>{
            var body = _.pick(req.body, 'from', 'to', 'status', 'note', 'employeeId', 'guestId');
            return stayInstance.update(body);
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json(error);
        });
    });

    app.post('/getStays', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.stays.findTotalStaysByTime(db.employees, db.guests, db.rooms,
                            db.templateRooms, req.body.from, req.body.to, req.body.statuses);
        }).then((result)=>{
            res.status(200).json(result);
        }).catch((error) => {
            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json(error);
        });
    });


    app.post('/getStaySummary', function(req, res) {
        var roomInstances;
        db.tokens.findToken(req.body.token).then(() => {
            return db.rooms.findByStayId(req.body.id, db.templateRooms);
        }).then((instances) => {
            return new Promise((resolve, reject) => {
                var i = 0;
                var sum = 0;
                if (instances.length == 0){
                    resolve([]);
                }
                instances.forEach((room) => {
                    sum += room.price_room;
                    console.log(room.id);
                    db.services.sumPriceForRoom(room.id, db.templateServices).then((result) => {
                        room.services = result.services
                        sum += result.sum
                        i++;
                        if (instances.length == i){
                            resolve({
                                rooms : instances,
                                sum
                            });
                        }
                    }, (error) => {
                        reject(error);
                    });

                });


            });
        }).then((response) => {
            res.status(200).json(response);
        }).catch((error) => {
            let code = (!_.isUndefined(error.code)) ? error.code : 400;
            res.status(code).json(error);
        });
    });






}
