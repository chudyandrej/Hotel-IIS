import React from 'react';
import moment from 'moment';
import ImageLoader from 'react-imageloader';

import DetailsTable from '../Tables/DetailsTable.jsx';
import FormButtons from '../Buttons/FormButtons.jsx';
import Guests from '../../Pages/Guests.jsx';
import InputLabelForm from './InputLabelForm.jsx';
import Rooms from '../../Pages/Rooms.jsx';
import StayType from './StayType.jsx';
import Table from '../Tables/Table.jsx';


export default class BookOrderForm extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            tableHeaders: {id: "Room Number", capacity: "Capacity", actual_price: "Price"},
            tableGuestHeaders: [{
                first_name: "First Name", last_name: "Family name",
                type_of_guest: "Type", phone_number: "Phone number:"
            }],
            detailsHeaders: {
                first_name: "First Name:", middle_name: "Middle Name:", last_name: "Family name:",
                type_of_guest: "Type:", email: "email:", phone_number: "Phone number:",
                idcard_number: "Card Number:", name_company: "Company Name:", ico: "ICO:", dic: "DIC:",
                address: "Address:", city: "City:", state: "State:"
            },

            startDate: moment(),
            endDate: moment().add(1, "day"),
            pending: false,

            showGuest: false,
            showRoomInfo: false,
            showFreeRooms: false,
            status: "reservation",
            note: null,
            guest: this.props.guest || null,
            oneGuestChosen: false,

            newOrder: false,
            ordered: [],
            Rows: [],

            errorMsg: null
        }
    }

    toggleHandler(name) {
        switch (name) {
            case "guest":
                this.setState({showGuest: !this.state.showGuest});
                break;
            case "room":
                this.setState({showRoomInfo: !this.state.showRoomInfo});
                break;
            case "freeRooms":
                this.setState({showFreeRooms: !this.state.showFreeRooms});
                break;
            case "oneGuestChosen":
                this.setState({oneGuestChosen: !this.state.oneGuestChosen});
        }
    }

    handleChange(name, evt) {
        switch (name) {
            case "status":
                this.setState({status: evt.target.value});
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
        this.setState({ordered: null});
    }

    handleDate(name, date) {
        let state = {};
        state[name] = date;
        this.setState(state);
    }

    handleChangeRoomPrice(id, evt) {
        this.state.ordered.forEach((room) => {
            if (room.id == id) {
                room['actual_price'] = evt.target.value;
            }
        });
    }

    /**
     * Push data to the list of ordered rooms if data isn't already there
     * otherwise, pop them out
     * @param data
     */
    orderRoom(data) {
        let newOrder = [];
        let removeOrderFlag = false;
        this.state.ordered.forEach((item) => {
            if (item == data) {
                removeOrderFlag = true;
            }
            else {
                newOrder.push(item)
            }
        });
        if (!removeOrderFlag) {
            newOrder.push(data);
        }
        this.setState({newOrder: true, ordered: newOrder});
    }

    chooseGuest(data) {
        this.setState({guest: data, oneGuestChosen: true});
    }

    handlerSubmitBtn() {
        let rooms = [];

        if (typeof(this.props.roomInfo) === "undefined") {
            this.state.ordered.forEach((room) => {
                rooms.push({
                    templateRoomId: room.id,
                    price_room: room.actual_price
                })
            });
        }
        else {
            rooms.push({
                templateRoomId: this.props.roomData.id,
                price_room: this.props.roomData.actual_price
            });
        }

        //check required values
        if (this.state.guest === null) {
            this.setState({errorMsg: "Choose a guest!"});
            return;
        }
        if (rooms.length === 0) {
            this.setState({errorMsg: "Choose a room!"});
            return;
        }

        //send data
        let data = {
            from: this.state.startDate.format('YYYY-MM-DD'),
            to: this.state.endDate.format('YYYY-MM-DD'),
            status: this.state.status,
            guestId: this.state.guest.id,
            rooms: rooms
        };
        this.state.note != "" ? data['note'] = this.state.note : null;

        this.props.Submit(data);
    }

    render() {
        let tableStyle = {
            clear: "both",
            marginTop: 20
        };
        let headerContainerStyle = {
            clear: "both",
            cursor: "pointer"
        };
        let headerStyle = {
            float: "left",
            marginRight: 25
        };

        let plusSign = <ImageLoader src={require("../../../public/img/plus.png")}/>;
        let minusSign = <ImageLoader src={require("../../../public/img/minus.png")}/>;

        let guestHeader = (
            <div style={headerContainerStyle}
                 onClick={this.toggleHandler.bind(this, "guest")}>
                <h2 style={headerStyle} className="page-header">Guest info:</h2>
                {this.state.showGuest ? minusSign : plusSign}
            </div>
        );

        let guest = null;
        let room = null;

        if (typeof(this.props.guestInfo) === "undefined") {
            let guestsTable = (
                <div>
                    <h2>Guests:</h2>
                    <Guests isChild={this.chooseGuest.bind(this)}
                            orderBtnName="Add"/>
                </div>
            );

            let chosenGuest = (
                <div>
                    <h2>Guest:</h2>
                    <Table TableData={this.state.tableGuestHeaders.concat(this.state.guest)}
                           order={this.toggleHandler.bind(this, "oneGuestChosen")}
                           orderBtnName="Remove"/>
                </div>
            );

            guest = (
                <div>
                    {this.state.oneGuestChosen ? chosenGuest : guestsTable}
                    {guestHeader}
                    {this.state.showGuest ? <DetailsTable Headers={this.state.detailsHeaders}
                                                          DetailsData={this.state.guest}/> : null}
                    <br/>
                </div>
            )
        }
        else {
            guest = (
                <div>
                    {guestHeader}
                    {this.state.showGuest ? this.props.guestInfo : null}
                    <br/>
                </div>
            )
        }

        if (typeof(this.props.roomInfo) === "undefined") {
            let priceInput = [];

            this.state.ordered.forEach((room) => {
                priceInput.push(
                    <InputLabelForm label={"Room " + room.id}
                                    placeholder={room.actual_price}
                                    key={priceInput.length}
                                    type="text"
                                    onChange={this.handleChangeRoomPrice.bind(this, room.id)}/>
                );
            });

            room = (
                <div>
                    <div style={headerContainerStyle}
                         onClick={this.toggleHandler.bind(this, "freeRooms")}>
                        <h2 style={headerStyle} className="page-header">Choose a Room</h2>
                        {this.state.showFreeRooms ? minusSign : plusSign}
                    </div>

                    <div style={{clear: "both"}}>
                        {this.state.showFreeRooms ? <Rooms isChild={this.orderRoom.bind(this)}
                                                           startDate={this.handleDate.bind(this, "startDate")}
                                                           endDate={this.handleDate.bind(this, "endDate")}/> : null}
                    </div>
                    <br/>
                    <div style={{clear: "both"}}>
                        <StayType status={this.state.status}
                                  onChange={this.handleChange.bind(this, "status")}
                                  createStay={true}/>
                        <InputLabelForm label="Note"
                                        type="text"
                                        onChange={this.handleChange.bind(this, "note")}/>
                        {priceInput}
                    </div>
                </div>
            )
        }
        else {
            room = (
                <div>
                    <div style={headerContainerStyle}
                         onClick={this.toggleHandler.bind(this, "room")}>
                        <h2 style={headerStyle} className="page-header">Room info:</h2>
                        {this.state.showRoomInfo ? minusSign : plusSign}
                    </div>

                    {this.state.showRoomInfo ? this.props.roomInfo : null}
                </div>
            )
        }

        return (
            <div style={tableStyle}>
                <h1 className="page-header">Book a Room</h1>
                {guest}
                {room}

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.props.Cancel}
                             errorMsg={this.state.errorMsg}
                             pending={this.props.pending}/>
            </div>
        );
    }
}
