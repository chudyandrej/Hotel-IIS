import React from 'react';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
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
            subHeader: "Active guests",
            tableHeaders: [{first_name: "First Name", last_name: "Family name", typeOfGuest: "Type"}],
            detailsHeaders: {
                first_name: "First Name:", middle_name: "Middle Name:", last_name: "Family name:",
                typeOfGuest: "Type:", email: "email:", phoneNumber: "Phone number:",
                idCardNumber: "Card Number:", nameCompany: "Company Name:", ico: "ICO:", dic: "DIC:",
                address: "Address:", city: "City:", state: "State:"
            },

            showTable: true,
            showAddForm: false,
            showDetails: false,
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
        this.fetchData();
    }

    fetchData() {
        this.setState({pending: true});
        sendRequest('https://young-cliffs-79659.herokuapp.com/getGuests', {}).then((data)=> {
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
    }


    handlerAllBtn() {
        this.setState({
            current: "default",
            all: "active",
            subHeader: "All guests"
        });
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
            subHeader: "Guests",
            addBtnClicked: false
        });
        this.fetchData();
    }

    handleShowDetails(data) {
        this.setState({
            showTable: false,
            showDetails: true,
            data: data
        })
    }

    handlerBackBtn() {
        this.setState({
            showTable: true,
            showDetails: false
        });
        this.fetchData();
    }


    handlerSubmitBtn(data) {
        this.setState({sending: true, errorMsg: null});
        var url = null;

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

    render() {
        var clsBtn = "btn btn-info ";

        var content = null;

        if (this.state.showTable) {
            var LeftBtnToolbar = (
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
                    {LeftBtnToolbar}
                    <Table TableData={this.state.data}
                           onEdit={this.handlerEditBtn.bind(this)}
                           onRemove={this.handlerRemove.bind(this)}
                           showDetails={this.handleShowDetails.bind(this)}
                           RemoveAction={this.state.removeAction}/>
                </div>
            )
        }
        else if (this.state.showDetails) {
            content = (
                <div>
                    <BackBtn onClick={this.handlerBackBtn.bind(this)}/>
                    <DetailsTable Headers={this.state.detailsHeaders}
                                  DetailsData={this.state.data}/>
                </div>
            )
        }
        else {
            content = (
                <GuestForm Submit={this.handlerSubmitBtn.bind(this)}
                           Cancel={this.handlerCancelBtn.bind(this)}
                           editData={this.state.editData}
                           errorMsg={this.props.errorMsg}
                           pending={this.state.sending}/>
            )
        }

        return (
            <div>
                <h1 className="page-header">{this.state.subHeader}</h1>

                {this.state.showDetails ? null : <RightBtnToolbar Add={this.handlerAddBtn.bind(this)}
                                                                  AddState={this.state.addBtnClicked}
                                                                  Remove={this.handlerRemoveBtn.bind(this)}/> }

                {this.state.pending ? <Loading /> : content}
            </div>
        );
    }
}