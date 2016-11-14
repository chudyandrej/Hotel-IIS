var _ = require('underscore');
module.exports = function(sequelize, DataTypes) {
    var rooms = sequelize.define('rooms', {
        priceOfRoom: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    }, {
        classMethods:{
            findByStayId(stayId, templateRoomsObj){
                return new Promise(function(resolve, reject) {
                    rooms.findAll({
                        where: {
                            stayId : stayId
                        },
                        include: [templateRoomsObj]
                    }).then((stayInstance) => {
                        let result = [];
                        for(stayInst of stayInstance){
                            result.push(stayInst.toPublicJSON());
                        }
                        resolve(result);
                    },(e) => {
                        reject(e);
                    });
                });
            },
            findFreeRooms(staysObj,templateRoomsObj ,fromTime, toTime){
                return new Promise(function(resolve, reject) {
                    staysObj.getIdInProgressStays(fromTime,toTime).then((arrayOfStaysIDs) => {
                        rooms.findAll({
                            where: {
                                stayId: {
                                    $in: arrayOfStaysIDs
                                }
                            }
                        }).then((roomsInstances) => {
                            arrayOfRoomsInProgress = [];
                            roomsInstances.forEach((roomInstance) => {
                                arrayOfRoomsInProgress.push(roomInstance.get('templateRoomId'))
                            });
                            if (arrayOfRoomsInProgress.length === 0){
                                templateRoomsObj.findAll().then((templatesFreeRooms)=>{
                                    resolve(templatesFreeRooms);
                                }, (error) => {
                                    reject(error);
                                })
                            } else {
                                templateRoomsObj.findAll({
                                    where: {
                                        id: {
                                            $notIn: arrayOfRoomsInProgress
                                        }
                                    }
                                }).then((templatesFreeRooms) => {
                                    var result = [];
                                    templatesFreeRooms.forEach((templateFreeRoom) =>{
                                        result.push(templateFreeRoom.toPublicJSON());
                                    });
                                    resolve(templatesFreeRooms);
                                }, (error) => {
                                    reject(error);
                                });
                            }
                        }, (error) => {
                            reject(error);
                        });
                    }, (error) => {
                        reject(error);
                    })
                });
            }


        },
        instanceMethods:{
            toPublicJSON(){
                var publicData = _.pick(this.toJSON(), 'id', 'priceOfRoom');
                var templateRoom = this.get('templateRoom');
                if(templateRoom){
                    publicData.templateRoom = templateRoom.toPublicJSON();
                }
                return publicData;
            }
        }


    });
    return rooms;
};
