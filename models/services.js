module.exports = function(sequelize, DataTypes) {
    return sequelize.define('services', {
        priceOfService: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    });
};
