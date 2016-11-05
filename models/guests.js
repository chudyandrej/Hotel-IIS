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
            allowNull: true,
            validate: {
                len: [2, 15]
            }
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
    }, {
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
