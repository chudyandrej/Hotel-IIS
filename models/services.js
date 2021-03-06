var _ = require('underscore');
module.exports = function(sequelize, DataTypes) {
    var services =  sequelize.define('services', {
        price_service: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    }, {
        classMethods: {
            sumPriceForRoom(roomId, objTemplateServices, days){

                return new Promise((resolve, reject) => {
                    services.findAll({
                        where: {
                            roomId
                        },
                        include: [objTemplateServices]
                    }).then((instances) => {
                        let result = [];
                        let sum = 0;
                        instances.forEach((item) => {

                            if (item.templateService.isDaily){
                                sum += item.get('price_service') * days;
                            } else {
                                sum += item.get('price_service') ;
                            }
                            let tmp = item.toPublicJSON();
                            tmp.count = 1;
                            let found = false;
                            for (let ser of result){
                                if(tmp.templateService.id === ser.templateService.id){
                                    ser.count += 1;
                                    found = true;
                                    break;
                                }
                            }
                            if(!found){
                                result.push(tmp);
                            }

                        });
                        resolve({
                            services : result,
                            sum
                        });
                    }, (error) => {
                        reject(error)
                    });
                });
            },

            createReservationService(employeeId, requestBody){
                return new Promise(function(resolve, reject) {
                    let arrayRoomsIds = requestBody.roomsIds;
                    let i = 0;

                    if (!_.isArray(arrayRoomsIds) || arrayRoomsIds.length === 0){
                        reject({
                            errors:[{message: "Rooms array is not array! "}]
                        });
                    }
                    var body = _.pick(requestBody, 'price_service', 'templateServiceId');
                    body.employeeId = employeeId;
                    for (roomId of  arrayRoomsIds){
                        body.roomId = roomId;
                        services.create(body).then((serviceInstance) => {
                            i++;
                            if (i === arrayRoomsIds.length){
                                resolve();
                            }
                        }, (error) => {
                            reject(error);
                        });
                    }
                });
            }
        },

        instanceMethods: {
            toPublicJSON(){
                var publicDataService =  _.pick(this.toJSON(), 'id', 'price_service');
                var templateService = this.get('templateService');

                if (templateService){
                    publicDataService.templateService = templateService.toPublicJSON();
                }
                return publicDataService;

            }
        }
    });
    return services;
};
