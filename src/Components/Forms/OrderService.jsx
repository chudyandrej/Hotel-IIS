import React from 'react';

import FormButtons from '../Buttons/FormButtons.jsx';
import Stays from '../../Pages/Stays.jsx';

import {sendRequest} from '../../Functions/HTTP-requests.js';


export default class OrderService extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            chooseRoom: false,
            checkBtns: [],

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

    handlerChooseStay(data) {
        console.log(data);
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
    }

    handlerSubmitBtn(){

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
                <h2>Choose Room</h2>
                {this.state.checkBtns}
            </div>
        );

        return (
            <div style={tableStyle}>
                <h1 className="page-header">Order Service</h1>

                {this.props.serviceInfo}

                <Stays isChild={this.handlerChooseStay.bind(this)}/>

                {this.state.chooseRoom ? checkButtons : null}

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.props.Cancel}
                             pending={this.props.pending}/>
            </div>
        )
    }
}

