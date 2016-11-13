var _ = require('underscore');
module.exports = function(sequelize, DataTypes) {
    var services = sequelize.define('templateServices', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [2, 60]
            }
        },
        actualPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1234),
            allowNull: true
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
        }
    }, {
        instanceMethods:{
            toPublicJSON(){
                return _.pick(this.toJSON(), 'id', 'name', 'actualPrice','description', 'available', 'duration');
            }

        },
        classMethods: {
            findByID(id) {
                return new Promise((resolve, reject) => {
                    services.findById(id).then((service) => {
                        if (!service) {
                            reject('Service whit this identifier not exist');
                        }
                        resolve(service);
                    }, (error) => {
                        reject(error);
                    });
                });
            }
        }

    });
    return services;
};
