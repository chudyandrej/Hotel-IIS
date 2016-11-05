module.exports = function(app, db, _) {


    app.post('/login', function(req, res) {
        let body = _.pick(req.body, 'email', 'password');
        db.employees.authenticate(body).then((employee) => {
            return employee.generateToken('authentication');
        }).then((token) => {
            return db.tokens.create({
                token
            });
        }).then((tokenInstance) => {
            res.status(200).json({
                token: tokenInstance.get("token")
            });
        }).catch((error) => {
            res.status(400).json({
                error,
            });
        });
    });




    app.post('/logout', function(req, res) {
        db.tokens.findToken(req.body.token).then((tokenInstance) => {
            return tokenInstance.destroy();
        }).then(() => {
            res.status(200).send();
        }).catch((error) => {
            res.status(400).json({
                error
            });
        });
    });



}
