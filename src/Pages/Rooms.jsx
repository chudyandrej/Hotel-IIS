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

            tableHeaders: [{id: "Room Number:", actual_price: "Price:", tv: "TV:", internet: "Internet:", bar: "Bar:",
                bathtub: "Bathtub:", kitchen: "Kitchen:", balcony: "Balcony:"}],
            detailsHeaders: {
                id: "Room Number:", actual_price: "Price:", tv: "TV:", internet: "Internet:", bar: "Bar:",
                bathtub: "Bathtub:", kitchen: "Kitchen:", balcony: "Balcony:"
            },

            showTable: true,
            showDetails: false,

            startDate: moment(),
            endDate: moment().add(1, "day"),

            data: [],
            pending: true,
            sending: false
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
            //TODO handle error
            console.log("error");
            console.log(err);
        });
    }


    handlerButtons(name) {
        switch(name) {
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
                    //TODO handle error
                    console.log("error");
                    console.log(err);
                });
                break;
            case "cancel":
                this.state.availableBefore ? this.handlerButtons("available") : this.handlerButtons("all");
                this.setState({
                    subHeader: "Available Rooms",
                    available: "active",
                    all: "default",
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
                    this.setState({data: []});
                    return;
                }
                this.setState({startDate: date});
                if (this.props.startDate != null) {
                    this.props.startDate(date);
                }

                break;
            case "end":
                if (date.isBefore(this.state.startDate)) {
                    this.setState({data: []});
                    return;
                }
                this.setState({endDate: date});
                if (this.props.endDate != null) {
                    this.props.endDate(date);
                }
                break;
        }
        this.fetchData();
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
        sendRequest('https://young-cliffs-79659.herokuapp.com/checkIn', data)
            .then(() => {
                this.setState({sending: false});
                this.handlerButtons("cancel");
            }, (err) => {
                this.setState({
                    sending: false,
                    errorMsg: JSON.parse(err.text).message
                });
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
                           showDetails={this.handleShowDetails.bind(this)}/>
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

        return (
            <div>
                {this.state.showTable ? upperToolbar : null}
                {this.state.pending ? <Loading /> : mainContent}
            </div>
        );
    }
}