var _ = require('underscore');
module.exports = function(sequelize, DataTypes) {
    var stays =  sequelize.define('stays', {
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
    }, {
        classMethods:{
            findByID(id) {
                return new Promise((resolve, reject) => {
                    stays.findById(id).then((stay) => {
                        if (!stay) {
                            reject('Stay whit this identifier not exist');
                        }
                        resolve(stay);
                    }, (error) => {
                        reject(error);
                    });
                });
            }

        },
        instanceMethods:{
            toPublicJSON() {

                var publicData = _.pick(this.toJSON(), 'form', 'to', 'status','note');
                var employeePublicJSON = this.get('employee');
                var guestPublicJSON = this.get('guest');

                if (employeePublicJSON){
                    publicData.employee = employeePublicJSON.toPublicJSON();
                }
                if (guestPublicJSON){
                    publicData.guest = guestPublicJSON.toPublicJSON();
                }
                return publicData ;
            }

        }
    });
    return stays;
};
