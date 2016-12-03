module.exports = function(app, db, _) {

    app.post('/getRooms', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.templateRooms.findAll({});
        }).then((roomsInstances) => {
            let result = [];
            roomsInstances.forEach((roomInstance) => {
                result.push(roomInstance.toPublicJSON());
            });
            res.status(200).json(result);
        }).catch((error) => {
            let code = 400;
            if (!_.isUndefined(error.code)){
                code = error.code
            }
            res.status(code).json(error);
        });
    });

    app.post('/getFreeRooms', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.rooms.findFreeRooms(db.stays, db.templateRooms,req.body.from,req.body.to);
        }).then((result)=>{
            res.status(200).json(result);
        }).catch((error) => {
            let code = 400;
            if (!_.isUndefined(error.code)){
                code = error.code
            }
            res.status(code).json(error);
        });


    });

}
