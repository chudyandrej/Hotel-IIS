import React from 'react';
import moment from 'moment';

import DetailsTable from '../DetailsTable.jsx';
import FormButtons from '../Buttons/FormButtons.jsx';
import Guests from '../../Pages/Guests.jsx';
import InputLabelForm from './InputLabelForm.jsx';
import Rooms from '../../Pages/Rooms.jsx';
import {TableHeader} from '../Table.jsx';


export default class BookOrderForm extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            tableHeaders: {id: "Room Number", capacity: "Capacity", actual_price: "Price"},
            detailsHeaders: {
                first_name: "First Name:", middle_name: "Middle Name:", last_name: "Family name:",
                type_of_guest: "Type:", email: "email:", phone_number: "Phone number:",
                idcard_number: "Card Number:", name_company: "Company Name:", ico: "ICO:", dic: "DIC:",
                address: "Address:", city: "City:", state: "State:"
            },

            startDate: moment(),
            endDate: moment(),
            pending: false,

            showGuest: false,
            showRoomInfo: false,
            showFreeRooms: false,
            type: "reservation",
            note: null,
            guest: this.props.guest,

            newOrder: false,
            ordered: [],
            Rows: []
        }
    }

    toggleHandler(name) {
        switch(name) {
            case "guest":
                this.setState({showGuest: !this.state.showGuest});
                break;
            case "room":
                this.setState({showRoomInfo: !this.state.showRoomInfo});
                break;
            case "freeRooms":
                this.setState({showFreeRooms: !this.state.showFreeRooms});
                break;
        }
    }

    handleChange(name, evt) {
        switch (name){
            case "type":
                this.setState({type: evt.target.value});
                break;
            case "note":
                this.setState({note: evt.target.value});
                break;
            case "startDate":
                this.setState({startDate: evt.target.value});
                break;
            case "endDate":
                this.setState({endDate: evt.target.value});
                break;
        }
    }

    handleDate(name, date) {
        let state = {};
        state[name] = date;
        this.setState(state);
        console.log(state);
    }

    /**
     * Push data to ordered list if data isn't already there
     * otherwise, pop them out
     * @param data
     */
    orderRoom(data) {
        let newOrder = [];
        let removeOrderFlag = false;
        this.state.ordered.forEach(function (item) {
            if (item == data) {
                console.log("remove order");
                removeOrderFlag = true;
            }
            else {
                newOrder.push(item)
            }
        });
        if (!removeOrderFlag){
            newOrder.push(data);
        }
        this.setState({newOrder: true, ordered: newOrder});
    }

    chooseGuest(data) {
        this.setState({guest: data});
    }

    handlerSubmitBtn() {
        let rooms = [];
        this.state.ordered.forEach(function (room) {
            rooms.push({
                templateRoomId: room.id,
                price_room: room.actual_price
            })
        }.bind(this));

        let data = {
            from: this.state.startDate.format('YYYY-MM-DD'),
            to: this.state.endDate.format('YYYY-MM-DD'),
            status: this.state.type,
            note: this.state.note,
            guestId: this.state.guest.id,
            rooms: rooms
        };
        console.log(data);
        this.props.Submit(data);
    }

    render() {
        let tableStyle = {
            clear: "both",
            marginTop: 20
        };

        let guest = null;
        let room = null;

        if (this.props.guestInfo != null) {
            guest = (
                <div>
                    <h2 onClick={this.toggleHandler.bind(this, "guest")}
                        className="page-header">Guest info:</h2>
                    {this.state.showGuest ? this.props.guestInfo : null}
                </div>
            )
        }
        else {
            guest = (
                <div>
                   <Guests isChild={this.chooseGuest.bind(this)}/>
                    <h2 onClick={this.toggleHandler.bind(this, "guest")}
                        className="page-header">Guest info:</h2>
                    {this.state.showGuest ? <DetailsTable Headers={this.state.detailsHeaders}
                                                          DetailsData={this.state.guest}/> : null}
                </div>
            )
        }

        if (this.props.roomInfo != null) {
            room = (
                <div>
                    <h2 onClick={this.toggleHandler.bind(this, "room")}
                        className="page-header">Room info:</h2>
                    {this.state.showRoomInfo ? this.props.roomInfo : null}
                </div>
            )
        }
        else {
            room = (
                <div>
                    <h2 onClick={this.toggleHandler.bind(this, "freeRooms")}
                        className="page-header">Choose a Room</h2>

                    {this.state.showFreeRooms ? <Rooms isChild={this.orderRoom.bind(this)}
                                                       startDate={this.handleDate.bind(this, "startDate")}
                                                       endDate={this.handleDate.bind(this, "endDate")}/> : null}

                    <div className="form-group row ">
                        <label className="col-xs-2 col-form-label">Type of order:</label>
                        <div className="col-xs-6">
                            <select value={this.state.type}
                                    onChange={this.handleChange.bind(this, "type")}>
                                <option value="inProgress">inProgress</option>
                                <option value="reservation">reservation</option>
                            </select>
                        </div>
                    </div>
                    <InputLabelForm label="Note"
                                    type="text"
                                    onChange={this.handleChange.bind(this, "note")}/>
                </div>
            )
        }

        return (
            <div style={tableStyle}>
                <h1 className="page-header">Book Room</h1>
                {guest}
                {room}

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.props.Cancel}
                             pending={this.props.pending}/>
            </div>
        );
    }
}
