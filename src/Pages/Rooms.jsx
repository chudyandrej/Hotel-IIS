import React from 'react';
import moment from 'moment';

//TODO import of datepicker css file here instead of index.html
//import '../../node_modules/react-datepicker/dist/react-datepicker.css';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
import BookRoomForm from '../Components/Forms/BookRoomForm.jsx';
import CalendarInput from '../Components/CalendarInput.jsx';
import DetailsTable from '../Components/DetailsTable.jsx';
import Loading from '../Components/Loading.jsx';
import Table from '../Components/Table.jsx';

import {downloadData, sendRequest} from '../Functions/HTTP-requests.js';


export default class Rooms extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            available: "active",
            all: "default",
            availableBefore: true,
            subHeader: "Available Rooms",

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

    componentWillMount() {
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

    handlerAvailableBtn() {
        this.setState({
            available: "active",
            all: "default",
            availableBefore: true,
            subHeader: "Available Rooms"
        });
        this.fetchData();
    }

    handlerAllBtn() {
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
    }

    handleDayChange(name, date) {
        switch (name) {
            case "start":
                if (!date.isBefore(this.state.endDate)) {
                    console.log("INVALID DATE");
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
                    console.log("INVALID DATE");
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
        })
    }

    handlerBookRoomBtn(data) {
        this.setState({
            showTable: false,
            showDetails: false,
            data: data
        });
    }

    handlerCancelBtn() {
        this.setState({
            subHeader: "Available Rooms",
            available: "active",
            all: "default",
            showTable: true,
            showAddForm: false,
            showDetails: false,
            addBtnClicked: false
        });
        this.state.availableBefore ? this.handlerAvailableBtn() : this.handlerAllBtn();
    }

    handlerBookRoom(data) {
        this.setState({sending: true});
        //TODO CORRECT TYPO IN BACKEND
        sendRequest('https://young-cliffs-79659.herokuapp.com/chackIn', data)
            .then(() => {
                console.log("data sent successfully");
                this.setState({sending: false});
                this.handlerBtn.bind(this, "cancel");
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
        let title = (<h1 className="page-header">{this.state.subHeader}</h1>);

        if (this.state.showTable) {
            let LeftBtnToolbar = (
                <div className='btn-toolbar pull-left'>
                    <button type="button"
                            className={clsBtn + this.state.available}
                            onClick={this.handlerAvailableBtn.bind(this)}>
                        Available
                    </button>
                    <button type="button"
                            className={clsBtn + this.state.all}
                            onClick={this.handlerAllBtn.bind(this)}>
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

            mainContent = (
                <div>
                    {this.props.isChild == null ? title : null}
                    {this.props.isChild == null ? LeftBtnToolbar : null}
                    {this.state.all == "active" ? null : calendar}

                    <Table TableData={this.state.data}
                           Rooms={true}
                           order={this.props.isChild || this.handlerBookRoomBtn.bind(this)}
                           showDetails={this.handleShowDetails.bind(this)}/>
                </div>
            )
        }
        else if (this.state.showDetails) {
            mainContent = (
                <div>
                    {this.props.isChild == null ? title : null}
                    <BackBtn onClick={this.handlerCancelBtn.bind(this)}/>
                    <DetailsTable Headers={this.state.detailsHeaders}
                                  DetailsData={this.state.data}/>
                </div>
            );
        }
        else {  //order form
            mainContent = (
                <div>
                    <BookRoomForm Cancel={this.handlerCancelBtn.bind(this)}
                                  Submit={this.handlerBookRoom.bind(this)}
                                  roomInfo={
                                      <DetailsTable Headers={this.state.detailsHeaders}
                                                    DetailsData={this.state.data}/>
                                  }
                                  pending={this.state.sending}/>
                </div>
            )
        }

        return (
            <div>
                {this.state.pending ? <Loading /> : mainContent}
            </div>
        );
    }
}