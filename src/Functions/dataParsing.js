import React from 'react';
import moment from 'moment';


export const parseData = function(data, filter) {

    let tableData = [];
    let rooms = [];

    return new Promise((resolve, reject) => {

        data.forEach(function (row) {
            rooms = [];

            row.rooms.forEach(function (room) {
                rooms.push(room.templateRoom.roomNumber);

            });
            rooms = rooms.toString();
            tableData.push(
                {
                    id: row.id,
                    last_name: row.guest.last_name,
                    status: row.status,
                    from: moment(row.from).format('YYYY-MM-DD'),
                    to: moment(row.to).format('YYYY-MM-DD'),
                    roomNumber: rooms
                }
            );
        });

        //filter data if filter is not set to 'all'
        if (filter != "all") {
            let filteredData = [];
            tableData.forEach(function (stay) {
                if (stay.status == filter) {
                    filteredData.push(stay);
                }
            });

            resolve(filteredData);
        }
        resolve(tableData);
    });
};
