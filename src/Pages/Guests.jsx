import React from 'react';
import moment from 'moment';

import AddBtn from '../Components/Buttons/AddBtn.jsx';
import BackBtn from '../Components/Buttons/BackBtn.jsx';
import BookRoomForm from '../Components/Forms/BookRoomForm.jsx';
import DetailsTable from '../Components/Tables/DetailsTable.jsx';
import GuestForm from '../Components/Forms/GuestForm.jsx'
import Loading from '../Components/Loading.jsx';
import SearchBox from '../Components/SearchBox.jsx';
import Table from '../Components/Tables/Table.jsx';

import {sendRequest, downloadData} from '../Functions/HTTP-requests.js';
import {formatHistoryDates} from '../Functions/dataParsing.js';


export default class Guests extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            current: "active",
            all: "default",
            currentBefore: typeof(this.props.isChild) === "undefined",
            subHeader: "Current guests",
            isNotChild: typeof(this.props.isChild) === "undefined",
            tableHeaders: [{
                first_name: "First Name", last_name: "Family name",
                type_of_guest: "Type", phone_number: "Phone number:"
            }],
            detailsHeaders: {
                first_name: "First Name:", middle_name: "Middle Name:", last_name: "Family name:",
                type_of_guest: "Type:", email: "email:", phone_number: "Phone number:",
                idcard_number: "Card Number:", name_company: "Company Name:", ico: "ICO:", dic: "DIC:",
                address: "Address:", city: "City:", state: "State:"
            },
            historyHeaders: [{from: "From:", to: "To:", status: "Status:", note: "Note:"}],

            showTable: true,
            showAddForm: false,
            showDetails: false,
            bookRoom: false,

            editData: null,
            historyData: null,
            data: [],

            pending: true,
            pendingHistory: false,
            sending: false,
            errorMsg: null,

            errorNotification: null
        };
    }

    componentDidMount() {
        if (typeof(this.props.isChild) === "undefined") {
            this.fetchCurrentGuests("");
        }
        else {
            this.fetchAllGuests({});
            this.setState({subHeader: "Guests"});
        }
    }

    fetchAllGuests(data) {
        this.setState({pending: true});
        downloadData("getGuests", data).then((data) => {
            data = this.state.tableHeaders.concat(data);
            this.setState({pending: false, data: data});
        }, (err) => {
            this.setState({errorNotification: err.popup, pending: false});
        });
    }

    fetchCurrentGuests(text) {
        this.setState({pending: true});
        let data = {
            from: moment().format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD'),
            text: text
        };
        downloadData("getCurrentGuests", data).then((data) => {
            data = this.state.tableHeaders.concat(data);
            this.setState({pending: false, data: data});
        }, (err) => {
            this.setState({errorNotification: err.popup, pending: false});
        });
    }

    searchOnChange(evt) {
        this.setState({pending: true});
        evt.preventDefault();

        if (this.state.currentBefore) {
            this.fetchCurrentGuests(evt.target.value);
        }
        else {
            this.fetchAllGuests({text: evt.target.value})
        }
    }

    handlerBtn(name) {
        switch (name) {
            case "current":
                this.setState({
                    current: "active",
                    all: "default",
                    currentBefore: true,
                    subHeader: "Current guests"
                });
                this.fetchCurrentGuests("");
                break;
            case "all":
                this.setState({
                    current: "default",
                    all: "active",
                    currentBefore: false,
                    subHeader: "All guests"
                });
                this.fetchAllGuests({});
                break;
            case "add":
                this.setState({
                    showTable: false,
                    showAddForm: true,
                    subHeader: "Add a new guest"
                });
                break;
            case "cancel":
                if (this.state.currentBefore) {
                    this.handlerBtn("current");
                }
                else {
                    this.handlerBtn("all");
                }
                this.setState({
                    showTable: true,
                    showAddForm: false,
                    showDetails: false,
                    bookRoom: false,
                    editData: null,
                    errorMsg: null
                });
                break;
        }
    }

    handlerEditBtn(data) {
        // data = data are sent by the row, which a user wants to edit
        this.setState({
            showTable: false,
            showAddForm: false,
            subHeader: "Edit the guest",

            editData: data
        });
    }

    handleShowDetails(data) {
        this.setState({
            pendingHistory: true,
            showTable: false,
            showDetails: true,
            data: data
        });
        //download history of stays of the user
        downloadData("getGuestsStays", {id: data.id}).then((history) => {
            formatHistoryDates(history).then((history) => {
                history = this.state.historyHeaders.concat(history);
                this.setState({pendingHistory: false, historyData: history});
            });
        }, (err) => {
            this.handlerBtn("cancel");
            this.setState({errorNotification: err.popup, pendingHistory: false});
        });
    }

    handlerSubmitBtn(data) {
        this.setState({sending: true, errorMsg: null});
        let url = null;

        if (this.state.editData === null) {  //add a new guest
            url = 'https://young-cliffs-79659.herokuapp.com/addGuest';
        }
        else {  //edit the guest
            url = 'https://young-cliffs-79659.herokuapp.com/editGuest';
            data['id'] = this.state.editData.id;
            this.setState({editData: null});
        }

        sendRequest(url, data)
            .then(() => {
                console.log("data sent successfully");
                this.setState({sending: false});
                this.handlerBtn("cancel");
            }, (err) => {
                this.setState({sending: false, errorMsg: err.msg});
            });
    }

    handlerBookRoomBtn(data) {
        this.setState({
            showTable: false,
            showDetails: false,
            bookRoom: true,
            data: data
        });
    }

    handlerBookRoom(data) {
        console.log("got data");
        console.log(data);
        this.setState({sending: true, errorMsg: null});
        sendRequest('https://young-cliffs-79659.herokuapp.com/checkIn', data)
            .then(() => {
                console.log("data sent successfully");
                this.setState({sending: false});
                this.handlerBtn("cancel");
            }, (err) => {
                this.handlerBtn("cancel");
                this.setState({errorNotification: err.popup, sending: false});
            });
    }

    render() {
        let clsBtn = "btn btn-info ";

        let content = null;
        let title = <h1 className="page-header">{this.state.subHeader}</h1>;

        let searchInput = (
            <SearchBox onChange={this.searchOnChange.bind(this)} placeholder="Search Guests"/>
        );

        let LeftBtnToolbar = (
            <div className='btn-toolbar pull-left'>
                <button type="button"
                        className={clsBtn + this.state.current}
                        onClick={this.handlerBtn.bind(this, "current")}>
                    Current
                </button>
                <button type="button"
                        className={clsBtn + this.state.all}
                        onClick={this.handlerBtn.bind(this, "all")}>
                    All
                </button>
            </div>
        );

        if (this.state.showTable) {
            content = (
                <div>
                    <Table TableData={this.state.data}
                           onEdit={this.state.isNotChild ? this.handlerEditBtn.bind(this) : null}
                           order={this.props.isChild || this.handlerBookRoomBtn.bind(this)}
                           orderBtnName={this.props.orderBtnName || "Book"}
                           showDetails={this.handleShowDetails.bind(this)}/>
                </div>
            )
        }
        else if (this.state.showDetails) {
            let history = (
                <Table TableData={this.state.historyData}/>
            );
            content = (
                <div>
                    {this.state.isNotChild ? title : null}
                    <BackBtn onClick={this.handlerBtn.bind(this, "cancel")}/>
                    <DetailsTable Headers={this.state.detailsHeaders}
                                  DetailsData={this.state.data}/>
                    <h3>Guest's History</h3>
                    {this.state.pendingHistory ? <Loading /> : history}
                </div>
            )
        }
        else if (this.state.bookRoom) {
            content = (
                <BookRoomForm Cancel={this.handlerBtn.bind(this, "cancel")}
                              Submit={this.handlerBookRoom.bind(this)}
                              guest={this.state.data}
                              guestInfo={
                                  <DetailsTable Headers={this.state.detailsHeaders}
                                                DetailsData={this.state.data}/>
                              }
                              pending={this.state.sending}/>
            )
        }
        else {
            content = (
                <div>
                    {title}
                    <GuestForm Submit={this.handlerSubmitBtn.bind(this)}
                               Cancel={this.handlerBtn.bind(this, "cancel")}
                               editData={this.state.editData}
                               errorMsg={this.state.errorMsg}
                               pending={this.state.sending}/>
                </div>
            )
        }

        let upperToolbar = (
            <div>
                {this.state.isNotChild ? title : null}
                {this.state.isNotChild ? LeftBtnToolbar : null}
                {searchInput}
                {this.state.isNotChild ? <AddBtn Add={this.handlerBtn.bind(this, "add")}/> : null}
            </div>
        );

        if (this.state.errorNotification != null) {
            content = this.state.errorNotification;
        }

        return (
            <div>
                {this.state.showTable ? upperToolbar : null}
                {this.state.pending ? <Loading /> : content}
            </div>
        );
    }
}