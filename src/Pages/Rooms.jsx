import React from 'react';
import moment from 'moment';

//TODO import of datepicker css file here instead of index.html
//import '../../node_modules/react-datepicker/dist/react-datepicker.css';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
import BookRoomForm from '../Components/Forms/BookRoomForm.jsx';
import CalendarInput from '../Components/CalendarInput.jsx';
import DetailsTable from '../Components/Tables/DetailsTable.jsx';
import Loading from '../Components/Loading.jsx';
import Table from '../Components/Tables/Table.jsx';

import {downloadData, sendRequest} from '../Functions/HTTP-requests.js';


export default class Rooms extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            available: "active",
            all: "default",
            availableBefore: true,
            subHeader: "Available Rooms",
            isNotChild: typeof(this.props.isChild) === "undefined",

            tableHeaders: [{
                id: "Room Number", actual_price: "Price (€)", capacity: "Capacity", tv: "TV:", internet: "Internet:",
                bar: "Bar:", bathtub: "Bathtub:", kitchen: "Kitchen:", balcony: "Balcony:"
            }],
            detailsHeaders: {
                id: "Room Number:", actual_price: "Price (€):", capacity: "Capacity", tv: "TV:", internet: "Internet:",
                bar: "Bar:", bathtub: "Bathtub:", kitchen: "Kitchen:", balcony: "Balcony:"
            },

            showTable: true,
            showDetails: false,

            startDate: moment(),
            endDate: moment().add(1, "day"),

            data: [],
            pending: true,
            sending: false,

            errorNotification: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({pending: true});
        let toSend = {
            from: this.state.startDate.format('YYYY-MM-DD'),
            to: this.state.endDate.format('YYYY-MM-DD')
        };
        downloadData('getFreeRooms', toSend).then((data) => {
            data = this.state.tableHeaders.concat(data);
            this.setState({pending: false, data: data});
        }, (err) => {
            this.setState({errorNotification: err.popup, pending: false});
        });
    }


    handlerButtons(name) {
        switch (name) {
            case "available":
                this.setState({
                    available: "active",
                    all: "default",
                    availableBefore: true,
                    subHeader: "Available Rooms"
                });
                this.fetchData();
                break;
            case "all":
                this.setState({
                    available: "default",
                    all: "active",
                    availableBefore: false,
                    subHeader: "All Rooms"
                });
                this.setState({pending: true});
                downloadData('getRooms', {}).then((data) => {
                    data = this.state.tableHeaders.concat(data);
                    this.setState({pending: false, data: data});
                }, (err) => {
                    this.setState({errorNotification: err.popup, pending: false});
                });
                break;
            case "cancel":
                this.state.availableBefore ? this.handlerButtons("available") : this.handlerButtons("all");
                this.setState({
                    showTable: true,
                    showDetails: false
                });
                break;
        }
    }

    handleDayChange(name, date) {
        switch (name) {
            case "start":
                if (!date.isBefore(this.state.endDate)) {
                    this.setState({startDate: date, data: []});
                } else {
                    this.setState({startDate: date}, this.fetchData);
                }
                //if Rooms page is rendered inside f.e. BookRoomForm
                //send date to the parent as well
                if (this.props.startDate != null) {
                    this.props.startDate(date);
                }
                break;
            case "end":
                if (date.isBefore(this.state.startDate)) {
                    this.setState({endDate: date, data: []});
                } else {
                    this.setState({endDate: date}, this.fetchData);
                }
                //if Rooms page is rendered inside f.e. BookRoomForm
                //send date to the parent as well
                if (this.props.endDate != null) {
                    this.props.endDate(date);
                }
                break;
        }
    }

    handleShowDetails(data) {
        this.setState({
            showTable: false,
            showDetails: true,
            data: data
        });
    }

    handlerBookRoomBtn(data) {
        this.setState({
            showTable: false,
            showDetails: false,
            data: data
        });
    }

    handlerBookRoom(data) {
        this.setState({sending: true});
        sendRequest('https://hotel-iis.herokuapp.com/checkIn', data)
            .then(() => {
                this.setState({sending: false});
                this.handlerButtons("cancel");
            }, (err) => {
                //close form and show notification
                this.handlerCancelBtn();
                this.setState({sending: false, errorNotification: err.popup});
            });
    }

    render() {
        let clsBtn = "btn btn-info ";
        let mainContent = null;
        let title = <h1 className="page-header">{this.state.subHeader}</h1>;

        let LeftBtnToolbar = (
            <div className='btn-toolbar pull-left'>
                <button type="button"
                        className={clsBtn + this.state.available}
                        onClick={this.handlerButtons.bind(this, "available")}>
                    Available
                </button>
                <button type="button"
                        className={clsBtn + this.state.all}
                        onClick={this.handlerButtons.bind(this, "all")}>
                    All
                </button>
            </div>
        );

        let calendar = (
            <CalendarInput startDate={this.state.startDate}
                           endDate={this.state.endDate}
                           onChangeStart={this.handleDayChange.bind(this, "start")}
                           onChangeEnd={this.handleDayChange.bind(this, "end")}/>
        );

        if (this.state.showTable) {
            mainContent = (
                <div>
                    <Table TableData={this.state.data}
                           Rooms={true}
                           order={this.state.available === "active" ?
                           this.props.isChild || this.handlerBookRoomBtn.bind(this) : null}
                           showDetails={this.state.isNotChild ? this.handleShowDetails.bind(this) : null}/>
                </div>
            )
        }
        else if (this.state.showDetails) {
            mainContent = (
                <div>
                    {this.state.isNotChild ? title : null}
                    <BackBtn onClick={this.handlerButtons.bind(this, "cancel")}/>
                    <DetailsTable Headers={this.state.detailsHeaders}
                                  DetailsData={this.state.data}/>
                </div>
            );
        }
        else {  //order form
            mainContent = (
                <div>
                    <BookRoomForm Cancel={this.handlerButtons.bind(this, "cancel")}
                                  Submit={this.handlerBookRoom.bind(this)}
                                  roomData={this.state.data}
                                  roomInfo={
                                      <DetailsTable Headers={this.state.detailsHeaders}
                                                    DetailsData={this.state.data}/>
                                  }
                                  pending={this.state.sending}/>
                </div>
            )
        }

        let upperToolbar = (
            <div>
                {this.state.isNotChild ? title : null}
                {this.state.isNotChild ? LeftBtnToolbar : null}
                {this.state.all === "active" ? null : calendar}
            </div>
        );

        if (this.state.errorNotification != null) {
            mainContent = this.state.errorNotification;
        }

        return (
            <div>
                {this.state.showTable ? upperToolbar : null}
                {this.state.pending ? <Loading /> : mainContent}
            </div>
        );
    }
}