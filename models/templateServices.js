module.exports = function(sequelize, DataTypes) {
    return sequelize.define('templateServices', {
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
        status: {
            type: DataTypes.ENUM('actual', 'canceled'),
        },
        duration: {
            type: DataTypes.INTEGER,
        }
    });
};
