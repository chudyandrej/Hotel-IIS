module.exports = function(sequelize, DataTypes) {
    return sequelize.define('stays', {
        form: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        to: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        status: {
            type: DataTypes.ENUM('reservation', 'inProgres', 'canceled', 'ended'),
        },
        note: {
            type: DataTypes.STRING(1234),
            allowNull: true
        }
    });
};
