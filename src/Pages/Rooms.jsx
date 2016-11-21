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

import {sendRequest} from '../Functions/HTTP-requests.js';


export default class Rooms extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            available: "active",
            unavailable: "default",
            all: "default",
            history: "default",
            subHeader: "Available Rooms",

            tableHeaders: [{id: "Room Number", capacity: "Capacity", actual_price: "Price"}],
            detailsHeaders: {
                id: "Room Number:", actual_price: "Price:", tv: "TV:", internet: "Internet:", bar: "Bar:",
                bathtub: "Bathtub:", kitchen: "Kitchen:", balcony: "Balcony:"
            },

            showTable: true,
            showDetails: false,

            startDate: moment(),
            endDate: moment(),

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
            from: "2016-05-04",//this.state.startDate.format('YYYY-MM-DD'),
            to: "2016-12-06",//this.state.endDate.format('YYYY-MM-DD')
        };
        sendRequest('https://young-cliffs-79659.herokuapp.com/getFreeRooms', toSend).then((data)=> {
            data = this.state.tableHeaders.concat(JSON.parse(data.text));
            this.setState({pending: false, data: data});
        }, (err)=> {
            //TODO handle error
            console.log("error");
            console.log(err);
        });
    }

    handlerAvailableBtn() {
        this.setState({
            available: "active",
            unavailable: "default",
            all: "default",
            history: "default",
            subHeader: "Available Rooms"
        });
    }

    handlerUnAvailableBtn() {
        this.setState({
            available: "default",
            unavailable: "active",
            all: "default",
            history: "default",
            subHeader: "Unavailable Rooms"
        });
    }

    handlerAllBtn() {
        this.setState({
            available: "default",
            unavailable: "default",
            all: "active",
            history: "default",
            subHeader: "All Rooms"
        });
    }

    handleDayChange(name, date) {
        switch (name) {
            case "start":
                this.setState({startDate: date});
                break;
            case "end":
                this.setState({endDate: date});
                //TODO call backend to get free rooms in the specified time
                break;
        }
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
            showTable: true,
            showAddForm: false,
            showDetails: false,
            addBtnClicked: false
        });
        this.fetchData();
    }

    handlerBookRoom(data) {

    }

    render() {
        let clsBtn = "btn btn-info ";
        let mainContent = null;

        if (this.state.showTable) {
            let LeftBtnToolbar = (
                <div className='btn-toolbar pull-left'>
                    <button type="button"
                            className={clsBtn + this.state.available}
                            onClick={this.handlerAvailableBtn.bind(this)}>
                        Available
                    </button>
                    <button type="button"
                            className={clsBtn + this.state.unavailable}
                            onClick={this.handlerUnAvailableBtn.bind(this)}>
                        Unavailable
                    </button>
                    <button type="button"
                            className={clsBtn + this.state.all}
                            onClick={this.handlerAllBtn.bind(this)}>
                        All
                    </button>
                </div>
            );

            mainContent = (
                <div>
                    {this.props.isChild == null ? LeftBtnToolbar : null}
                    <CalendarInput startDate={this.state.startDate}
                                   endDate={this.state.endDate}
                                   onChangeStart={this.handleDayChange.bind(this, "start")}
                                   onChangeEnd={this.handleDayChange.bind(this, "end")}/>

                    <Table TableData={this.state.data}
                           order={this.handlerBookRoomBtn.bind(this)}
                           showDetails={this.handleShowDetails.bind(this)}/>
                </div>
            )
        }
        else if (this.state.showDetails) {
            mainContent = (
                <div>
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
                <h1 className="page-header">{this.state.subHeader}</h1>

                {this.state.pending ? <Loading /> : mainContent}
            </div>
        );
    }
}