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
import {getGuests} from '../Functions/dataParsing.js';


export default class Guests extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            current: "active",
            all: "default",
            subHeader: "Current guests",
            tableHeaders: [{first_name: "First Name", last_name: "Family name", type_of_guest: "Type"}],
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
            removeAction: false,
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
        this.fetchCurrentGuests();
    }

    fetchAllGuests() {
        this.setState({pending: true});
        downloadData("getGuests", {}).then((data) => {
            data = this.state.tableHeaders.concat(data);
            this.setState({pending: false, data: data});
        }, (err)=> {
            console.log(err);
            //TODO handle error
        });
    }

    fetchCurrentGuests(){
        this.setState({pending: true});
        let data = {
            from: moment().format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD')
        };
        //TODO correct typo in api
        downloadData("getCurrenGuests", data).then((data) => {
            console.log(data);
            getGuests(data).then((data) => {
                data = this.state.tableHeaders.concat(data);
                this.setState({pending: false, data: data});
            }, (err) => {
                //TODO handle error
            });
        }, (err)=> {
            console.log(err);
            //TODO handle error
        });
    }

    handlerBtn(name) {
        switch(name) {
            case "current":
                this.setState({
                    current: "active",
                    all: "default",
                    subHeader: "Current guests"
                });
                this.fetchCurrentGuests();
                break;
            case "all":
                this.setState({
                    current: "default",
                    all: "active",
                    subHeader: "All guests"
                });
                this.fetchAllGuests();
                break;
            case "add":
                this.setState({
                    showTable: false,
                    showAddForm: true,
                    subHeader: "Add a new guest",
                    addBtnClicked: true,
                    removeAction: false
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
                this.fetchCurrentGuests();
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
            removeAction: false,

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
        downloadData("getGuestsStays", {id: data.id}).then((history) => {
            history = this.state.historyHeaders.concat(history);
            this.setState({pendingHistory: false, historyData: history});
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
            .then(()=> {
                console.log("data sent successfully");
                this.setState({sending: false});
                this.handlerCancelBtn();
            }, (err)=> {
                this.setState({
                    sending: false,
                    errorMsg: JSON.parse(err.text).message});
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
        //TODO
    }

    render() {
        let clsBtn = "btn btn-info ";

        let content = null;

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

            content = (
                <div>
                    {this.props.isChild == null ? LeftBtnToolbar : null}
                    <Table TableData={this.state.data}
                           onEdit={this.handlerEditBtn.bind(this)}
                           order={this.handlerBookRoomBtn.bind(this)}
                           showDetails={this.handleShowDetails.bind(this)}
                           RemoveAction={this.state.removeAction}/>
                </div>
            )
        }
        else if (this.state.showDetails) {
            let history = (
                <Table TableData={this.state.historyData}/>
            );
            content = (
                <div>
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
                              guestInfo={
                                  <DetailsTable Headers={this.state.detailsHeaders}
                                                DetailsData={this.state.data}/>
                              }
                              pending={this.state.sending}/>
            )
        }
        else {
            content = (
                <GuestForm Submit={this.handlerSubmitBtn.bind(this)}
                           Cancel={this.handlerBtn.bind(this, "cancel")}
                           editData={this.state.editData}
                           errorMsg={this.state.errorMsg}
                           pending={this.state.sending}/>
            )
        }

        let RightToolbar = (
            <RightBtnToolbar Add={this.handlerBtn.bind(this, "add")}
                             AddState={this.state.addBtnClicked}/>
        );

        return (
            <div>
                <h1 className="page-header">{this.state.subHeader}</h1>

                {this.props.isChild == null && !this.state.showDetails ? RightToolbar : null}

                {this.state.pending ? <Loading /> : content}
            </div>
        );
    }
}