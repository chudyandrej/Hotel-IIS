import React from 'react';

import AddBtn from '../Components/Buttons/AddBtn.jsx';
import BackBtn from '../Components/Buttons/BackBtn.jsx';
import DetailsTable from '../Components/Tables/DetailsTable.jsx';
import EmployeeForm from '../Components/Forms/EmployeeForm.jsx';
import Loading from '../Components/Loading.jsx';
import SearchBox from '../Components/SearchBox.jsx';
import Table from '../Components/Tables/Table.jsx';

import {sendRequest} from '../Functions/HTTP-requests.js';


export default class Employees extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            employed: "active",
            former: "default",
            employedBefore: true,
            subHeader: "Employees",
            tableHeaders: [{
                first_name: "First Name", last_name: "Family name", email: "Email", permissions: "Permissions"
            }],
            detailsHeaders: {
                first_name: "First Name:", middle_name: "Middle Name:", last_name: "Family name:",
                permissions: "Permissions:", password: "Password:", email: "Email:", phone_number: "Phone number:",
                iban: "IBAN:", address: "Address:", city: "City:", state: "State:"
            },

            showTable: true,
            showAddForm: false,
            showDetails: false,
            addBtnClicked: false,

            editData: null,
            data: [],
            pending: true,
            sending: false,

            errorMsg: null,
            errorNotification: null
        };
    }

    componentWillMount() {
        this.fetchData({currently_employed: true});
    }

    fetchData(flag) {
        this.setState({pending: true});
        sendRequest('https://hotel-iis.herokuapp.com/getEmployees', flag).then((data) => {
            data = this.state.tableHeaders.concat(JSON.parse(data.text));
            this.setState({pending: false, data: data});
        }, (err) => {
            this.setState({errorNotification: err.popup, pending: false});
        });
    }

    searchOnChange(evt) {
        evt.preventDefault();
        this.fetchData({
            currently_employed: this.state.employed === "active",
            text: evt.target.value
        })
    }

    handlerEmployedBtn() {
        this.setState({
            employed: "active",
            former: "default",
            employedBefore: true,
            subHeader: "Employees"
        });
        this.fetchData({currently_employed: true});
    }

    handlerFormerBtn() {
        this.setState({
            employed: "default",
            former: "active",
            employedBefore: false,
            subHeader: "Former Employees"
        });
        this.fetchData({currently_employed: false});
    }

    handlerAddBtn() {
        this.setState({
            subHeader: "Add a new employee",
            showTable: false,
            showAddForm: true,
            addBtnClicked: true
        });
    }

    handlerRemove(id) {
        sendRequest('https://hotel-iis.herokuapp.com/deleteEmployee', {id: id})
            .then((data) => {
                console.log("data's deleted successfully");
            }, (err) => {
                this.setState({errorNotification: err.popup});
            });
    }

    handlerCancelBtn() {
        this.state.employedBefore ? this.handlerEmployedBtn() : this.handlerFormerBtn();
        this.setState({
            showTable: true,
            showDetails: false,
            showAddForm: false,
            addBtnClicked: false,
            editData: null,
            errorMsg: null
        });
    }

    handleShowDetails(data) {
        this.setState({
            showTable: false,
            showDetails: true,
            data: data
        })
    }

    handlerEditBtn(data) {
        // data = data are sent by the row, which a user wants to edit
        this.setState({
            subHeader: "Edit the employee",
            showTable: false,
            showAddForm: false,
            addBtnClicked: false,

            editData: data
        });
    }

    handlerSubmitBtn(data) {
        this.setState({sending: true, errorMsg: null});
        let url = null;

        if (this.state.editData == null) {  //add a new employee
            url = 'https://hotel-iis.herokuapp.com/registration';
        }
        else {  //edit the employee
            url = 'https://hotel-iis.herokuapp.com/editEmployee';
            data['email'] = this.state.editData.email;
            this.setState({editData: null});
        }

        sendRequest(url, data)
            .then(() => {
                this.setState({sending: false});
                this.handlerCancelBtn();
            }, (err) => {
                this.setState({sending: false, errorMsg: err.msg});
            });
    }

    render() {
        let clsBtn = "btn btn-info ";

        let content = null;

        let LeftBtnToolbar = (
            <div className='btn-toolbar pull-left'>
                <button type="button"
                        className={clsBtn + this.state.employed}
                        onClick={this.handlerEmployedBtn.bind(this)}>
                    Employed
                </button>
                <button type="button"
                        className={clsBtn + this.state.former}
                        onClick={this.handlerFormerBtn.bind(this)}>
                    Former
                </button>
            </div>
        );

        let RightToolbar = (
            <AddBtn Add={this.handlerAddBtn.bind(this)}
                    AddState={this.state.addBtnClicked}/>
        );
        let searchInput = (
            <SearchBox onChange={this.searchOnChange.bind(this)} placeholder="Search Employees"/>
        );

        let upperToolbar = (
            <div>
                {LeftBtnToolbar}
                {searchInput}
                {this.state.former == "default" ? RightToolbar : null}
            </div>
        );

        if (this.state.showTable) {
            content = (
                <div>
                    <Table TableData={this.state.data}
                           onEdit={this.state.former == "default" ? this.handlerEditBtn.bind(this) : null}
                           onRemove={this.state.former == "default" ? this.handlerRemove.bind(this) : null}
                           showDetails={this.handleShowDetails.bind(this)}/>
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
        else {
            content = (
                <EmployeeForm Submit={this.handlerSubmitBtn.bind(this)}
                              Cancel={this.handlerCancelBtn.bind(this)}
                              editData={this.state.editData}
                              errorMsg={this.state.errorMsg}
                              pending={this.state.sending}/>
            )
        }

        if (this.state.errorNotification != null) {
            content = this.state.errorNotification;
        }

        return (
            <div>
                <h2 className="page-header">{this.state.subHeader}</h2>
                {this.state.showTable ? upperToolbar : null}
                {this.state.pending ? <Loading /> : content}
            </div>
        );
    }
}