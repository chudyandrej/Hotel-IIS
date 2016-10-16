module.exports = function(sequelize, DataTypes) {
    return sequelize.define('templateRooms', {
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
    });
};
