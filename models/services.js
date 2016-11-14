module.exports = function(sequelize, DataTypes) {
    return sequelize.define('services', {
        price_service: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    });
};
