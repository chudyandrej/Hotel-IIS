var _ = require('underscore');
module.exports = function(sequelize, DataTypes) {
    var services =  sequelize.define('services', {
        price_service: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    }, {
        classMethods: {
            sumPriceForRoom(roomId, objTemplateServices){
                return new Promise(function(resolve, reject) {
                    services.findAll({
                        where: {
                            roomId
                        },
                        include: [objTemplateServices]
                    }).then((instances) => {
                        let result = [];
                        let sum = 0;
                        instances.forEach((item) => {
                            sum += item.get('price_service');
                            result.push(item.toPublicJSON());
                        });
                        resolve({
                            services : result,
                            sum
                        });
                    }, (error) => {
                        reject(error)
                    });
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
