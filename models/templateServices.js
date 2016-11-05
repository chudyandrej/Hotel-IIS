module.exports = function(sequelize, DataTypes) {
    var services = sequelize.define('templateServices', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
        },
        duration: {
            type: DataTypes.INTEGER,
        }
    }, {
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
