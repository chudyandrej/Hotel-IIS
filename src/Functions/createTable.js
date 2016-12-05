import React from 'react';
import ImageLoader from 'react-imageloader';

/**
 * Creates table of usage of services per room
 * @param rooms - array of room objects with objects of used services
 * @param services - array of services objects used during a stay
 * @returns {Promise}
 */
export const createServicesPerRoomsTable = function (rooms, services) {
    return new Promise((resolve, reject) => {

        let header = [];

        header.push(
            <th className="col-md-1 text-center" key={header.length}>
                Service/Room number
            </th>
        );
        rooms.forEach((room) => {
            header.push(
                <th className="col-md-1 text-center" key={header.length}>
                    {room.templateRoom.id}
                </th>
            );
        });

        let columns = [];
        let rows = [];

        services.forEach((service) => {
            columns = [];
            columns.push(
                <td key={columns.length} className="text-center">
                    {service.templateService.name}
                </td>
            );
            rooms.forEach((room) => {
                let NoneOfServices = true;
                room.services.forEach((serviceOnRoom) => {
                    if (service.templateService.id === serviceOnRoom.templateService.id) {
                        NoneOfServices = false;
                        columns.push(
                            <td key={columns.length} className="text-center">
                                <ImageLoader src={require("../../public/img/tick.png")}/>
                            </td>
                        );
                    }
                });
                if (NoneOfServices) {
                    columns.push(
                        <td key={columns.length} className="text-center">
                            <ImageLoader src={require("../../public/img/cross.png")}/>
                        </td>
                    );
                }
            });
            rows.push(
                <tr key={rows.length}>
                    {columns}
                </tr>
            );
        });
        rows = (
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    {header}
                </tr>
                </thead>
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
export const createSummaryTables = function (data) {
    return new Promise((resolve, reject) => {

        let rooms = [];
        let roomsTable = [];
        roomsTable.push(
            <div key={roomsTable.length} className={"form-group"}>
                <label className="col-xs-2 col-form-label">
                    Room number:
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
                        {room.price_room} €
                    </p>
                </div>
            );

            room.services.forEach((service) => {
                let found = false;
                for (let service2 of services) {
                    if (service.templateService.id === service2.templateService.id) { //already have
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
                        {service.price_service} €
                        {service.templateService.isDaily ? " * " + data.lengthStay + " days" : null}
                        {service.count > 1 ? " * " + service.count + " times" : null}
                    </p>
                </div>
            );
        });

        resolve([rooms, services, roomsTable, servicesTable]);
    });
};

