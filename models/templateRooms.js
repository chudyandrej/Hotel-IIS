var _ = require('underscore');
module.exports = function(sequelize, DataTypes) {
    var templateRooms =  sequelize.define('templateRooms', {
        actual_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
        },
        tv: {
            type: DataTypes.BOOLEAN
        },
        internet: {
            type: DataTypes.BOOLEAN
        },
        bar: {
            type: DataTypes.BOOLEAN
        },
        bathtub: {
            type: DataTypes.BOOLEAN
        },
        kitchen: {
            type: DataTypes.BOOLEAN
        },
        balcony: {
            type: DataTypes.BOOLEAN
        }
    }, {

        instanceMethods: {
            toPublicJSON(){
                return _.pick(this.toJSON(), 'id','actual_price','capacity','tv','internet',
                              'bar','bathtub','kitchen','balcony');
            }
        },

        classMethods: {
            findByID(id){
                return new Promise((resolve, reject) => {
                    templateRooms.fundById(id).then((templateRoomInstance) => {
                        if(!templateRoomInstance){
                            reject({
                                errors:[
                                    {
                                        message: "Template of room with the identifier does not exist",
                                        path: "id",
                                        value: id
                                    }]
                            });
                        }
                        resolve(templateRoomInstance);
                    }, (e) => {
                        reject(e);
                    });
                });
            }
        }
    });
    return templateRooms;
};
