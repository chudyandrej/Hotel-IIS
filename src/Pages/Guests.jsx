import React from 'react';
import moment from 'moment';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
import BookRoomForm from '../Components/Forms/BookRoomForm.jsx';
import DetailsTable from '../Components/DetailsTable.jsx';
import GuestForm from '../Components/Forms/GuestForm.jsx'
import Loading from '../Components/Loading.jsx';
import RightBtnToolbar from '../Components/Buttons/RightBtnToolbar.jsx';
import Table from '../Components/Table.jsx';

import {sendRequest, downloadData} from '../Functions/HTTP-requests.js';
import {formatHistoryDates, getGuests} from '../Functions/dataParsing.js';


export default class Guests extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            current: "active",
            all: "default",
            currentBefore: this.props.isChild == null,
            subHeader: "Current guests",
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
            addBtnClicked: false,

            editData: null,
            historyData: null,
            data: [],
            pending: true,
            pendingHistory: false,
            sending: false,
            errorMsg: null
        };
    }

    componentWillMount() {
        if (this.props.isChild == null) {
            this.fetchCurrentGuests();
        }
        else {
            this.fetchAllGuests();
            this.setState({subHeader: "Guests"});
        }
    }

    fetchAllGuests() {
        this.setState({pending: true});
        downloadData("getGuests", {}).then((data) => {
            data = this.state.tableHeaders.concat(data);
            this.setState({pending: false, data: data});
        }, (err) => {
            console.log(err);
            //TODO handle error
        });
    }

    fetchCurrentGuests() {
        this.setState({pending: true});
        let data = {
            from: moment().format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD')
        };
        downloadData("getCurrentGuests", data).then((data) => {
            console.log(data);
            getGuests(data).then((data) => {
                data = this.state.tableHeaders.concat(data);
                this.setState({pending: false, data: data});
            }, (err) => {
                //TODO handle error
            });
        }, (err) => {
            console.log(err);
            //TODO handle error
        });
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
                this.fetchCurrentGuests();
                break;
            case "all":
                this.setState({
                    current: "default",
                    all: "active",
                    currentBefore: false,
                    subHeader: "All guests"
                });
                this.fetchAllGuests();
                break;
            case "add":
                this.setState({
                    showTable: false,
                    showAddForm: true,
                    subHeader: "Add a new guest",
                    addBtnClicked: true
                });
                break;
            case "cancel":
                this.setState({
                    showTable: true,
                    showAddForm: false,
                    showDetails: false,
                    bookRoom: false,
                    subHeader: "Current Guests",
                    addBtnClicked: false
                });
                if (this.state.currentBefore) {
                    this.handlerBtn("current");
                }
                else {
                    this.handlerBtn("all");
                }
                break;
        }
    }

    handlerEditBtn(data) {
        // data = data are sent by the row, which a user wants to edit
        this.setState({
            showTable: false,
            showAddForm: false,
            subHeader: "Edit the guest",
            addBtnClicked: true,

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
            }, (err) => {
                //TODO handle error
            });
        }, (err) => {
            //TODO handle error
        });
    }

    handlerSubmitBtn(data) {
        this.setState({sending: true, errorMsg: null});
        let url = null;

        if (this.state.editData == null) {  //add a new guest
            url = 'https://young-cliffs-79659.herokuapp.com/addGuest';
        }
        else {  //edit the guest
            url = 'https://young-cliffs-79659.herokuapp.com/editGuest';
            data['id'] = this.state.editData.id;
        }

        sendRequest(url, data)
            .then(() => {
                console.log("data sent successfully");
                this.setState({sending: false});
                this.handlerCancelBtn();
            }, (err) => {
                this.setState({
                    sending: false,
                    errorMsg: JSON.parse(err.text).message
                });
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

        let content = null;
        let title = <h1 className="page-header">{this.state.subHeader}</h1>;

        if (this.state.showTable) {
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

            let RightToolbar = (
                <RightBtnToolbar Add={this.handlerBtn.bind(this, "add")}
                                 AddState={this.state.addBtnClicked}/>
            );

            content = (
                <div>
                    {this.props.isChild == null ? title: null}
                    {this.props.isChild == null ? LeftBtnToolbar : null}
                    {this.props.isChild == null ? RightToolbar : null}
                    <Table TableData={this.state.data}
                           onEdit={this.props.isChild == null ? this.handlerEditBtn.bind(this) : null}
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
                    {this.props.isChild == null ? title: null}
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
                              guestID={this.state.data}
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

        return (
            <div>
                {this.state.pending ? <Loading /> : content}
            </div>
        );
    }
}