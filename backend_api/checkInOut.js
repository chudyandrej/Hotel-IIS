module.exports = function(app, db, _) {


    app.post('/checkIn', function(req, res) {
        var stayInstanceGlobal;
        db.tokens.findToken(req.body.token).then(() => {
            return db.employees.findByToken(req.body.token);
        }).then((instanceEmplyee) => {
            return new Promise((resolve, reject) => {
                if (_.isArray(req.body.rooms) && req.body.rooms.length >= 1){
                    resolve(instanceEmplyee.get('id'));
                } else {
                    reject({
                        message: "Error: Rooms not existing ! "
                    });
                }
            });
        }).then((employeeId) => {
            var stayData =  _.pick(req.body, 'from', 'to', 'status', 'note', 'guestId');
            stayData.employeeId = employeeId
            return db.stays.create(stayData);
        }).then((stayInstance) => {
            stayInstanceGlobal = stayInstance
            return db.sequelize.transaction((t) => {
                actualyCreatedRooms = [];
                var i = 0;
                var promises = []
                for (room of req.body.rooms){
                    var roomData =  _.pick(room, 'price_room', 'templateRoomId');
                    roomData.stayId = stayInstance.get('id');
                    var newPromise = db.rooms.create(roomData, {transaction: t});
                    promises.push(newPromise);
                }
                return Promise.all(promises);
            });
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            if (stayInstanceGlobal){
                stayInstanceGlobal.destroy();
            }
            let code = 400;
            if (!_.isUndefined(error.code)){
                code = error.code
            }
            res.status(400).json(error);
        });

    });

}
