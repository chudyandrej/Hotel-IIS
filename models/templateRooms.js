var _ = require('underscore');
module.exports = function(sequelize, DataTypes) {
    var templateRooms =  sequelize.define('templateRooms', {
        roomNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,

        },
        actualPrice: {
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
                return _.pick(this.toJSON(), 'id','roomNumber','actualPrice','capacity','tv','internet',
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
                                        message: "Room whit this identifier not exist",
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
