module.exports = function(app, db, _) {


    app.post('/login', function(req, res) {
        let body = _.pick(req.body, 'email', 'password');
        let permissions;
        db.employees.authenticate(body).then((employee) => {
            permissions = employee.get('permissions');
            return employee.generateToken('authentication');
        }).then((token) => {
            return db.tokens.create({
                token
            });
        }).then((tokenInstance) => {
            res.status(200).json({
                token: tokenInstance.get("token"),
                permissions
            });
        }).catch((error) => {
            let code = 400;
            if (!_.isUndefined(error.code)){
                code = error.code
            }
            res.status(code).json(error);
        });
    });




    app.post('/logout', function(req, res) {
        db.tokens.findToken(req.body.token).then((tokenInstance) => {
            return tokenInstance.destroy();
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            let code = 400;
            if (!_.isUndefined(error.code)){
                code = error.code
            }
            res.status(code).json(error);
        });
    });



}
