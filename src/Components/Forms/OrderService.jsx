import React from 'react';

import FormButtons from '../Buttons/FormButtons.jsx';
import Stays from '../../Pages/Stays.jsx';
import Table from '../Tables/Table.jsx';

import {parseStaysData} from '../../Functions/dataParsing.js';


export default class OrderService extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            chooseRoom: false,
            chosenRoom: null,
            checkBtns: [],
            tableHeaders: [{
                last_name: "Last Name", status: "Status", from: "From", to: "To", roomNumber: "Room"
            }],

            rooms: []
        }
    }

    handleCheck(evt) {
        let roomsTemp = [];
        let removeFlag = false;

        this.state.rooms.forEach((room) => {
            if (room == parseInt(evt.target.value, 10)) {
                removeFlag = true;
            }
            else {
                roomsTemp.push(room);
            }
        });

        if (!removeFlag) {
            roomsTemp.push(parseInt(evt.target.value, 10));
        }
        this.setState({rooms: roomsTemp});
    }

    handlerToggle() {
        this.setState({chooseRoom: !this.state.chooseRoom});
    }

    handlerChooseStay(data) {
        //give an array to parseStays data, parse it, then prepare checkboxes
        parseStaysData([data], "all").then((tableData) => {
            tableData = this.state.tableHeaders.concat(tableData);
            this.setState({chosenRoom: tableData});

            //prepare checkboxes with numbers and identificators  of rooms in the chosen stay
            let checkBtns = [];
            data.rooms.forEach((room) => {
                checkBtns.push(
                    <label className="form-check-inline" key={checkBtns.length}>
                        <input className="form-check-input"
                               type="checkbox"
                               id="inlineCheckbox1"
                               onChange={this.handleCheck.bind(this)}
                               value={room.id}/>
                        {room.templateRoom.id}
                    </label>
                )
            });

            this.setState({chooseRoom: true, checkBtns: checkBtns});
        });
    }

    handlerSubmitBtn() {

        let toSend = {
            price_service: this.props.service.actual_price,
            roomsIds: this.state.rooms,
            templateServiceId: this.props.service.id
        };

        this.props.Order(toSend);
    }

    render() {
        let tableStyle = {
            clear: "both",
            marginTop: 20
        };

        let checkButtons = (
            <div>
                <h2>Room number(s):</h2>
                {this.state.checkBtns}
            </div>
        );

        let chooseStay = (
            <div>
                <h2>Choose a stay:</h2>
                <Stays isChild={this.handlerChooseStay.bind(this)}/>
            </div>
        );

        let chosenStay = (
            <div>
                <h2>Stay:</h2>
                <Table TableData={this.state.chosenRoom}
                       order={this.handlerToggle.bind(this)}
                       orderBtnName="Remove"/>
            </div>
        );

        return (
            <div style={tableStyle}>
                <h1 className="page-header">Order Service</h1>

                {this.props.serviceInfo}
                <br/>
                {this.state.chooseRoom ? chosenStay : chooseStay}

                {this.state.chooseRoom ? checkButtons : null}

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.props.Cancel}
                             pending={this.props.pending}/>
            </div>
        )
    }
}

