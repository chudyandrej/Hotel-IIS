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
            table: null
        }
    }

    componentWillMount() {
        this.setState({pending: true});
        console.log("stayID: "+this.props.stayId);

        downloadData("getStaySummary", {id: this.props.stayId}).then((data) => {
            console.log(data);

            createSummaryTables(data)
                .then((tables) => {
                    console.log(tables);
                    createServicesPerRoomsTable(tables[0], tables[1])
                        .then((table) => {
                            console.log(table);
                            this.setState({
                                pending: false,
                                roomsTable: tables[2],
                                servicesTable: tables[3],
                                table: table,
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

        let content = (
            <div>
                <form style={tableStyle}>
                    {this.state.roomsTable}
                </form>
                <form style={tableStyle}>
                    {this.state.servicesTable}
                </form>
                <form style={tableStyle}>
                    <div className="table-responsive" style={tableStyle}>
                        {this.state.table}
                    </div>
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