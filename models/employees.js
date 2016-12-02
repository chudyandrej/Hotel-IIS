var bcrypt = require('bcrypt');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var _ = require('underscore');
var cryptojs = require('crypto-js')

module.exports = function(sequelize, DataTypes) {
    var employees = sequelize.define('employees', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 15]
            }
        },
        middle_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
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
        password_hash: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: true,
            validate: {
                len: [7, 50]
            },
            set(value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);
                this.setDataValue('password', value);
                this.setDataValue('password_hash', hashedPassword);
            }
        },
        permissions: {
            type: DataTypes.ENUM('root', 'user', 'none')
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 20]
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 20]
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 20]
            }
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isNumeric: true,
            }
        },
        iban: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [15, 32]
            }
        },
        currently_employed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {

        instanceMethods: {
            generateToken(type) {
                return new Promise((resolve, reject) => {
                    try {
                        if (!_.isString(type)) {
                            reject({
                                message: "Data type of token is not string"
                            });
                        }

                        let tokenData = JSON.stringify({
                            id: this.get('id'),
                            type,
                            time: moment().valueOf()
                        });
                        let encryptedData = cryptojs.AES.encrypt(tokenData, 'abc123!@#!').toString();
                        let token = jwt.sign({
                            token: encryptedData
                        }, 'qwery09856');
                        resolve(token);
                    } catch (e) {
                        reject(e);
                    }
                });
            },
            toPublicJSON() {
                return _.pick(this.toJSON(), 'id', 'first_name', 'middle_name', 'last_name',
                              'email', 'permissions', 'address', 'city', 'state', 'phone_number',
                              'iban');
            }
        },
        classMethods: {
            findByToken(token) {
                return new Promise(function(resolve, reject) {
                    try {
                        if (!token){
                            reject({
                                message: "Token not found"
                            });
                        }
                        let decodeJwt = jwt.verify(token, 'qwery09856');
                        let bytes = cryptojs.AES.decrypt(decodeJwt.token, 'abc123!@#!');
                        let tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
                        employees.findById(tokenData.id).then((employee) => {
                            if (!employee){
                                reject({
                                    message: "Emply with the identifier does not exist. Problem whit token"
                                });
                            } else {
                                resolve(employee);
                            }
                        }, (e) => {
                            reject(e)
                        });
                    } catch (error) {
                        reject(error);
                    }
                });
            },
            authenticate(emailPass) {
                return new Promise(function(resolve, reject) {
                    if (!_.isString(emailPass.email) || !_.isString(emailPass.password)) {
                        reject({
                            message: "Email or password are not valid"
                        });
                    }
                    employees.findOne({
                        where: {
                            email: emailPass.email
                        }
                    }).then((employee) => {
                        if (employee && bcrypt.compareSync(emailPass.password, employee.get('password_hash'))){
                            resolve(employee);
                        } else {
                            reject({
                                message: "Wrong password or unexisting email"
                            });
                        }
                    }, (error) => {
                        reject(error);
                    });
                });
            },
            findByID(id) {
                return new Promise(function(resolve, reject) {
                    employees.findById(id).then((employee) => {
                        if (!employee) {
                            reject({
                                message: "Employee with the identifier does not exist."
                            });
                        }
                        resolve(employee);
                    }, (e) => {
                        reject(e);
                    });
                });
            }



        }
    });
    return employees;
};
