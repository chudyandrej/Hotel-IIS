import React from 'react';

import Loading from '../Components/Loading.jsx';

import {downloadData} from '../Functions/HTTP-requests.js';


export default class StaySummaryTable extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            pending: true,
            rooms: [],
            services: [],
            totalPrice: null,

            roomsTable: null,
            servicesTable: null,
            table: null
        }
    }

    componentWillMount() {
        this.setState({pending: true});
        console.log("stayID: "+this.props.stayId);

        downloadData("getStaySummary", {id: this.props.stayId}).then((data) => {
            console.log(data);

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

            this.setState({
                pending: false,
                roomsTable: roomsTable,
                servicesTable: servicesTable,
                totalPrice: data.sum
            });
           //TODO one more table
        });
    }

    render() {
        let tableStyle = {
            clear: "both",
            marginTop: 20
        };

        let content = (
            <div>
                <form style={tableStyle}>
                    {this.state.roomsTable}
                </form>
                <form style={tableStyle}>
                    {this.state.servicesTable}
                </form>
                <br/>
                <h3>Total Price: {this.state.totalPrice}</h3>
            </div>
        );

        return (
            <div>
                <h2>Summary:</h2>
                {this.state.pending ? <Loading/> : content}
            </div>
        )
    }
}