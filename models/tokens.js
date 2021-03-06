var cryptojs = require('crypto-js');
var moment = require('moment');
var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
    var tokens = sequelize.define('tokens', {
        token: {
            type: DataTypes.VIRTUAL,
            allowNull: false,

            validate: {
                len: [1]
            },
            set: function(value) {
                var hash = cryptojs.MD5(value).toString();
                this.setDataValue('token', value);
                this.setDataValue('tokenHash', hash);
            }
        },
        tokenHash: {
            type: DataTypes.STRING,
            unique: true,
        }
    }, {

        classMethods: {

            /**
            * Find token if exist
            * @param {String} hashToken
            * @return {TokenInstance} token
            */
            findToken(hashToken) {
                return new Promise(function(resolve, reject) {
                    if (!_.isString(hashToken) || hashToken === '') {
                        reject({
                            message: "Access denied. Token is not a string or it's an empty string",
                            code: 401
                        });
                    }
                    tokens.findOne({
                        where: {
                            tokenHash: cryptojs.MD5(hashToken).toString()
                        }
                    }).then(function(token) {
                        if (token){
                            token.changed('updatedAt', true)
                            token.update({
                                updatedAt: moment()
                            }).then((token) => {
                                resolve(token);
                            }, (error) => {
                                reject(error);
                            });

                        }else{
                            reject({
                                message: "Access denied. Token has expired",
                                code: 401
                            });
                        }
                    }, function(error) {
                        reject(error)
                    });
                });
            },


            /**
            * Filter all tokens with expired time
            */
            tokensTimeoutWatchdog() {
                tokens.findAll({}).then((tokensInstances) => {
                    tokensInstances.forEach((tokenInst) => {
                        let time = moment(tokenInst.get('updatedAt'), 'YYYY-MM-DDTHH:mm:ss.SSS');
                        if ((time.add(30, 'minute').isBefore(moment()))) {
                            tokenInst.destroy().then(() => {
                                console.log("Token was destroyed successful");
                            }, () => {
                                console.log("Error token destroying was unsuccessful ");
                            });
                        }

                    });
                });



            }
        }
    });
    return tokens;
}
