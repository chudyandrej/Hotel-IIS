var _ = require('underscore');
module.exports = function(sequelize, DataTypes) {
    var rooms = sequelize.define('rooms', {
        priceOfRoom: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    }, {
        classMethods:{
            findByStayId(stayId, templateRoomsObj){
                return new Promise(function(resolve, reject) {
                    rooms.findAll({
                        where: {
                            stayId : stayId
                        },
                        include: [templateRoomsObj]
                    }).then((stayInstance) => {
                        let result = [];
                        for(stayInst of stayInstance){
                            result.push(stayInst.toPublicJSON());
                        }
                        resolve(result);
                    },(e) => {
                        reject(e);
                    });
                });
            }
        },
        instanceMethods:{
            toPublicJSON(){
                var publicData = _.pick(this.toJSON(), 'id', 'priceOfRoom');
                var templateRoom = this.get('templateRoom');
                if(templateRoom){
                    publicData.templateRoom = templateRoom.toPublicJSON();
                }
                return publicData;
            }
        }


    });
    return rooms;
};
