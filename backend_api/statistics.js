var moment = require('moment');


module.exports = function(app, db, _) {


    app.post('/staysStatistics', function(req, res) {
        db.tokens.findToken(req.body.token).then(() => {
            return db.employees.findByToken(req.body.token);
        }).then((instanceEmplyee) => {
            return new Promise((resolve, reject) => {
                if (instanceEmplyee.get('permissions') === 'root'){
                    resolve();
                } else {
                    reject({
                        message: "Access denied!"
                    });
                }
            });
        }).then(() => {
            return db.stays.findAll({
                where:{
                    status: "ended"
                }
            });
        }).then((instances) => {
            let baseTime =  moment(moment().year()+"-"+ (moment().month()+1),"YYYY-MM");
            let months = moment.months();
            let statistic = [];
            statistic[0] = {
                date : baseTime.clone(),
                text: months[baseTime.month()],
                value : 0
            };
            for (let i = 0; i < 5; i++){
                statistic.push({
                    date : baseTime.subtract(1, 'month').clone(),
                    text: months[baseTime.month()],
                    value : 0
                });
            }

            instances.forEach((stay) =>{
                let time = moment(stay.get('from'), 'YYYY-MM-DDTHH:mm:ss.SSS')
                for (let i = 0; i < statistic.length; i++){
                    if(time.isAfter(statistic[i].date)){
                        statistic[i].value += 1;
                        break;
                    }
                }
            });
            for (let i = 0; i < statistic.length; i++){
                statistic[i] = _.pick(statistic[i], 'text','value');
            }
            res.status(200).json(statistic);
        }, (error) => {
            res.status(400).json(error);
        });



    });



}
