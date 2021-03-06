var _ = require('underscore');
var moment = require('moment');
module.exports = function(sequelize, DataTypes) {
    var stays =  sequelize.define('stays', {
        from: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        to: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        status: {
            type: DataTypes.ENUM('reservation', 'inProgress', 'canceled', 'ended'),
        },
        note: {
            type: DataTypes.STRING(1234),
            allowNull: true
        }
    }, {


        classMethods:{
            findByID(id) {
                return new Promise((resolve, reject) => {
                    stays.findById(id).then((stay) => {
                        if (!stay) {
                            reject({
                                message: "Template of service with the identifier does not exist"
                            });
                        }
                        resolve(stay);
                    }, (error) => {
                        reject(error);
                    });
                });
            },


            getCounDays(id) {
                return new Promise((resolve, reject) => {
                    stays.findById(id).then((stay) => {
                        if (!stay) {
                            reject({
                                message: "Template of service with the identifier does not exist"
                            });
                        }
                        let a = moment(stay.get("to"));
                        let b = moment(stay.get("from"));
                        let days = a.diff(b, 'days');
                        resolve(days);
                    }, (error) => {
                        reject(error);
                    });
                });
            },


            getArrayValFromActualStays(key, fromTime, toTime){
                return new Promise(function(resolve, reject) {
                    if (!_.isString(fromTime) || !_.isString(toTime) ){
                        reject("Undefined times 'from' and 'to'");
                    }
                    if(moment(fromTime) > moment(toTime)){
                        reject({
                            message: "Time FROM (" + fromTime + ") can't be bigger as time TO (" + toTime + ")"

                        });
                    }
                    stays.findAll({
                        where: {
                            from: {
                                $or:[{$lte: fromTime},{$lte: toTime}]
                            },
                            to: {
                                $or:[{$gte: fromTime},{$gte: toTime}]
                            },
                            status: {
                                $in: ['reservation', 'inProgress']
                            }
                        }
                    }).then((staysInstances) => {
                        let result = [];
                        staysInstances.forEach((stayInstance) => {
                            result.push(stayInstance.get(key));
                        });
                        resolve(result);

                    }, (error) => {
                        reject(error);
                    });
                });

            },




            findTotalStaysByTime(employeesObj, guestsObj,roomsObj, templateRoomsObj, fromTime, toTime, statuses){
                return new Promise(function(resolve, reject) {
                    if (!_.isString(fromTime) || !_.isString(toTime) ){
                        reject({
                            message: "Undefined times FROM or TO"
                        });
                    }

                    if(moment(fromTime) > moment(toTime)){
                        reject({
                            message: "Time FROM (" + fromTime + ") can't be bigger as time TO (" + toTime + ")"
                        });

                    }
                    if (_.isUndefined(statuses) ){
                        statuses = ['reservation', 'inProgress', 'canceled', 'ended']
                    }
                    stays.findAll({
                        where: {
                            from: {
                                $or:[{$lte: fromTime},{$lte: toTime}]
                            },
                            to: {
                                $or:[{$gte: fromTime},{$gte: toTime}]
                            },
                            status: {
                                $in: statuses
                            }
                        },
                        include: [employeesObj, guestsObj]
                    }).then((staysInstances) => {
                        let result = [];
                        if(staysInstances.length === 0){
                            resolve(result);
                            return;
                        }
                        staysInstances.forEach((stayInstance) => {
                            let stayInstanceJSON = stayInstance.toPublicJSON();
                            roomsObj.findByStayId(stayInstanceJSON.id, templateRoomsObj).then((stayRooms) => {
                                stayInstanceJSON.rooms = stayRooms;
                                result.push(stayInstanceJSON);
                                if(result.length === staysInstances.length){
                                    resolve(result);
                                }
                            }, (error) => {
                                reject(error);
                            });
                        });
                    }, (error) => {
                        reject(error);
                    });
                });
            }



        },
        instanceMethods:{

            toPublicJSON() {

                var publicData = _.pick(this.toJSON(), 'id', 'from', 'to', 'status','note');
                var employeePublicJSON = this.get('employee');
                var guestPublicJSON = this.get('guest');

                if (employeePublicJSON){
                    publicData.employee = employeePublicJSON.toPublicJSON();
                }
                if (guestPublicJSON){
                    publicData.guest = guestPublicJSON.toPublicJSON();
                }
                return publicData ;
            }

        }
    });
    return stays;
};
