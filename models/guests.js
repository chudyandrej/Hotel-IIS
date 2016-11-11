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
        idCardNumber: {
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
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        typeOfGuest: {
            type: DataTypes.ENUM('person', 'company'),
        },
        nameCompany: {
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
                return _.pick(this.toJSON(), 'id', 'first_name', 'middle_name', 'last_name','idCardNumber', 'email','phoneNumber','typeOfGuest','nameCompany','ico','dic', 'address', 'city', 'state');
            }
        },
        classMethods: {
            findByID(id){
                return new Promise((resolve, reject) => {
                    guests.findById(id).then((guestInstance) => {
                        if (!guestInstance) {
                            reject('Guest whit this ID not exist!')
                        }
                        resolve(guestInstance);
                    }, (error) => {
                        reject(error);
                    });
                });
            }
        }
    });
    return guests;

};
