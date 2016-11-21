import React from 'react';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
import BookRoomForm from '../Components/Forms/BookRoomForm.jsx';
import DetailsTable from '../Components/DetailsTable.jsx';
import GuestForm from '../Components/Forms/GuestForm.jsx'
import Loading from '../Components/Loading.jsx';
import RightBtnToolbar from '../Components/Buttons/RightBtnToolbar.jsx';
import Table from '../Components/Table.jsx';

import {sendRequest} from '../Functions/HTTP-requests.js';


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

            showTable: true,
            showAddForm: false,
            showDetails: false,
            bookRoom: false,
            removeAction: false,
            addBtnClicked: false,

            editData: null,
            data: [],
            pending: true,
            sending: false,
            errorMsg: null
        };
    }

    componentWillMount() {
        this.fetchData("getGuests");  //TODO add api of current guests
    }

    fetchData(api) {
        this.setState({pending: true});
        sendRequest('https://young-cliffs-79659.herokuapp.com/' + api, {}).then((data)=> {
            data = this.state.tableHeaders.concat(JSON.parse(data.text));
            this.setState({pending: false, data: data});
        }, (err)=> {
            //TODO handle error
        });
    }

    handlerCurrentBtn() {
        this.setState({
            current: "active",
            all: "default",
            subHeader: "Current guests"
        });
        this.fetchData("getCurrentGuests");
    }

    handlerAllBtn() {
        this.setState({
            current: "default",
            all: "active",
            subHeader: "All guests"
        });
        this.fetchData("getGuests");
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

    handlerAddBtn() {
        this.setState({
            showTable: false,
            showAddForm: true,
            subHeader: "Add a new guest",
            addBtnClicked: true,
            removeAction: false
        });
    }

    handlerRemoveBtn() {
        this.setState({removeAction: !this.state.removeAction});
    }

    handlerRemove(id) {
        sendRequest('https://young-cliffs-79659.herokuapp.com/editGuest', {available: false, id: id})
            .then((data)=> {
                console.log("data's deleted successfully");
                this.setState({sending: false});
            }, (err)=> {
                //TODO handle error
            });
    }

    handlerCancelBtn() {
        this.setState({
            showTable: true,
            showAddForm: false,
            showDetails: false,
            bookRoom: false,
            subHeader: "Guests",
            addBtnClicked: false
        });
        this.fetchData('getGuests');
    }

    handleShowDetails(data) {
        this.setState({
            showTable: false,
            showDetails: true,
            data: data
        })
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

    }

    render() {
        let clsBtn = "btn btn-info ";

        let content = null;

        if (this.state.showTable) {
            let LeftBtnToolbar = (
                <div className='btn-toolbar pull-left'>
                    <button type="button"
                            className={clsBtn + this.state.current}
                            onClick={this.handlerCurrentBtn.bind(this)}>
                        Current
                    </button>
                    <button type="button"
                            className={clsBtn + this.state.all}
                            onClick={this.handlerAllBtn.bind(this)}>
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
                           onRemove={this.handlerRemove.bind(this)}
                           showDetails={this.handleShowDetails.bind(this)}
                           RemoveAction={this.state.removeAction}/>
                </div>
            )
        }
        else if (this.state.showDetails) {
            content = (
                <div>
                    <BackBtn onClick={this.handlerCancelBtn.bind(this)}/>
                    <DetailsTable Headers={this.state.detailsHeaders}
                                  DetailsData={this.state.data}/>
                </div>
            )
        }
        else if (this.state.bookRoom) {
            content = (
                <BookRoomForm Cancel={this.handlerCancelBtn.bind(this)}
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
                           Cancel={this.handlerCancelBtn.bind(this)}
                           editData={this.state.editData}
                           errorMsg={this.state.errorMsg}
                           pending={this.state.sending}/>
            )
        }

        let RightToolbar = (
            <RightBtnToolbar Add={this.handlerAddBtn.bind(this)}
                             AddState={this.state.addBtnClicked}
                             Remove={this.handlerRemoveBtn.bind(this)}/>
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