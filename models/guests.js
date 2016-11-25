var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
    var guests =  sequelize.define('guests', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 15]
            }
        },
        middle_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 15]
            }
        },
        idcard_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        type_of_guest: {
            type: DataTypes.ENUM('person', 'company'),
        },
        name_company: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ico: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dic: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },{
        instanceMethods: {
            toPublicJSON() {
                return _.pick(this.toJSON(), 'id', 'first_name', 'middle_name', 'last_name', 'idcard_number',
                              'email', 'phone_number', 'type_of_guest', 'name_company', 'ico', 'dic', 'address',
                              'city', 'state');
            }
        },
        classMethods: {
            findByID(id){
                return new Promise((resolve, reject) => {
                    guests.findById(id).then((guestInstance) => {
                        if (!guestInstance) {
                            reject({
                                errors:[{message: "Guest with the identifier does not exist"}]
                            });
                        }
                        resolve(guestInstance);
                    }, (error) => {
                        reject(error);
                    });
                });
            },



            getStays(objStays, guestId){
                return new Promise((resolve, reject) => {
                    objStays.findAll({
                        where: {
                            guestId
                        },
                        include: [invoices]
                    }).then((instances) => {
                        resolve(instances);
                    }, (error) => {
                        reject(error);
                    });
                });
            }
        }
    });
    return guests;

};
