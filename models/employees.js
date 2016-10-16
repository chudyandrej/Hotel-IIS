module.exports = function(sequelize, DataTypes) {
    return sequelize.define('employees', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 15]
            }
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 15]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            //TODO virtual hash password
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [7, 100]
            },
        },
        addres: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        iban: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [15, 32]
            }
        }
    });
};
