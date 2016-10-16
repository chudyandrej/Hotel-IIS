module.exports = function(sequelize, DataTypes) {
    return sequelize.define('rooms', {
        priceOfRoom: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    });
};
