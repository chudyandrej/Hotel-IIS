import React from 'react';

import Loading from '../Components/Loading.jsx';

import {downloadData} from '../Functions/HTTP-requests.js';
import {createServicesPerRoomsTable, createSummaryTables} from '../Functions/createTable.js';


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
            servicePerRoomTable: null
        }
    }

    componentWillMount() {
        this.setState({pending: true});

        downloadData("getStaySummary", {id: this.props.stayId}).then((data) => {
            createSummaryTables(data)
                .then((tables) => {
                    createServicesPerRoomsTable(tables[0], tables[1])
                        .then((table) => {
                            this.setState({
                                pending: false,
                                roomsTable: tables[2],
                                servicesTable: tables[1].length > 0 ? tables[3] : null,
                                servicePerRoomTable: tables[1].length > 0 ? table : null,
                                totalPrice: data.sum
                            });
                        });
                });
        });
    }

    render() {
        let tableStyle = {
            clear: "both",
            marginTop: 20
        };

        let servicesTable = (
            <form style={tableStyle}>
                {this.state.servicesTable}
            </form>
        );

        let servicePerRoomTable = (
            <form style={tableStyle}>
                <div className="table-responsive" style={tableStyle}>
                    {this.state.servicePerRoomTable}
                </div>
            </form>
        );

        let content = (
            <div>
                <form style={tableStyle}>
                    {this.state.roomsTable}
                </form>
                {this.state.servicesTable != null ? servicesTable : null}
                {this.state.servicePerRoomTable != null ? servicePerRoomTable : null}
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