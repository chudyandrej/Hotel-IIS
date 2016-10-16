module.exports = function(sequelize, DataTypes) {
    return sequelize.define('guests', {
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
        noIdCard: {
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
        addres: {
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
    });

};
