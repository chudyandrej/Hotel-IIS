import React from 'react';
import moment from 'moment';

/**
 * Parses, edits and filters stays data.
 * @param data - [{id,from,to,employee:{},guest:{},room:{}},{},..]
 * @param filter - filter based on status of Stay (reservation, inProgress,..)
 * @returns {Promise}
 */
export const parseStaysData = function(data, filter) {
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
                    //convert string date to object and change its format
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

/**
 * Function returns list of objects named guest from objects of objects
 * @param data - list objects of objects - [{guest:{}}, {guest:{}},..]
 * @returns {Promise} - list of objects
 * */
export const getGuests = function(data) {

    let guests = [];

    return new Promise((resolve, reject) => {
        data.forEach(function (guest) {
            guests.push(guest.guest);
        });

        resolve(guests);
    });
};

/**
 * Changes format of dates in
 * @param data - [{..from:Obj, to:Obj,...},{},{},..]
 * @returns {Promise} - list of objects with formatted moments objects
 */
export const formatHistoryDates = function(data) {

    let history = [];

    return new Promise((resolve, reject) => {
        data.forEach(function (h) {
            h['from'] = moment(h.from).format('YYYY-MM-DD');
            h['to'] = moment(h.to).format('YYYY-MM-DD');
            history.push(h);
        });

        resolve(history);
    });
};
