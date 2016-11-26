import React from 'react';
import ImageLoader from 'react-imageloader';

/**
 * Creates table of usage of services per room
 * @param rooms - array of room objects with objects of used services
 * @param services - array of services objects used during a stay
 * @returns {Promise}
 */
export const createServicesPerRoomsTable = function(rooms, services) {
    return new Promise((resolve, reject) => {
        console.log("whyyyyeye");
        console.log(rooms);
        console.log(services);
        let columns = [];
        let header = [];

        columns.push(
            <th className="col-md-1 text-center" key={columns.length}>
                Service/Room
            </th>
        );
        rooms.forEach((room) => {
            columns.push(
                <th className="col-md-1 text-center" key={columns.length}>
                    {room.templateRoom.id}
                </th>
            );
        });
        header.push(
            <thead>
            <tr>
                {columns}
            </tr>
            </thead>
        );

        let rows = [];

        services.forEach((service) => {
            columns = [];
            console.log(service.templateService.name);
            columns.push(
                <td key={columns.length} className="text-center">
                    {service.templateService.name}
                </td>
            );
            rooms.forEach((room) => {
                let NoneOfServices = true;
                room.services.forEach((serviceOnRoom) => {
                    if (service.id === serviceOnRoom.id) {
                        NoneOfServices = false;
                        columns.push(
                            <td key={columns.length} className="text-center">
                                <ImageLoader src="../../public/img/tick.png" />
                            </td>
                        );
                    }
                });
                if (NoneOfServices){
                    columns.push(
                        <td key={columns.length} className="text-center">
                            <ImageLoader src="../../public/img/cross.png" />
                        </td>
                    );
                }
            });
            rows.push(
                <tr>
                    {columns}
                </tr>
            );
        });
        rows = (
            <table className="table table-striped table-hover">
                {header}
                <tbody>
                {rows}
                </tbody>
            </table>
        );
        resolve(rows);
    });
};

/**
 * Parses services and rooms out of data and creates summary tables
 * @param data - data from backend - array of stay objects where is array of
 *               used rooms objects. In each room object is array of used
 *               services objects. [{rooms: [{roomInfo}, services: [{service info},..]],..},..]
 * @returns {Promise}
 */
export const createSummaryTables = function(data) {
    return new Promise((resolve, reject) => {

        let rooms = [];
        let roomsTable = [];
        roomsTable.push(
            <div key={roomsTable.length} className={"form-group"}>
                <label className="col-xs-2 col-form-label">
                    Rooms:
                </label>
                <p>
                    <b>Price/day:</b>
                </p>
            </div>
        );

        let services = [];
        let servicesTable = [];

        //parse services and rooms
        data.rooms.forEach((room) => {
            rooms.push(room);

            roomsTable.push(
                <div key={roomsTable.length} className={"form-group"}>
                    <label className="col-xs-2 col-form-label">
                        {room.templateRoom.id}
                    </label>
                    <p>
                        {room.price_room}
                    </p>
                </div>
            );

            room.services.forEach((service) => {
                let found = false;
                for (let service2 in services) {
                    if (service === service2){ //already have
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    services.push(service);
                }
            });
        });
        servicesTable.push(
            <div key={servicesTable.length} className={"form-group"}>
                <label className="col-xs-2 col-form-label">
                    Services:
                </label>
                <p>
                    <b>Price:</b>
                </p>
            </div>
        );
        services.forEach((service) => {
            servicesTable.push(
                <div key={servicesTable.length} className={"form-group"}>
                    <label className="col-xs-2 col-form-label">
                        {service.templateService.name}
                    </label>
                    <p>
                        {service.price_service}
                    </p>
                </div>
            );
        });

        resolve([rooms, services, roomsTable, servicesTable]);
    });
};

