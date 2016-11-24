import React from 'react';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
import DetailsTable from '../Components/DetailsTable.jsx';
import EmployeeForm from '../Components/Forms/EmployeeForm.jsx';
import Loading from '../Components/Loading.jsx';
import AddBtn from '../Components/Buttons/AddBtn.jsx';
import Table from '../Components/Table.jsx';

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
            errorMsg: null
        };
    }

    componentWillMount() {
        this.fetchData({currently_employed: true});
    }

    fetchData(flag) {
        this.setState({pending: true});
        sendRequest('https://young-cliffs-79659.herokuapp.com/getEmployees', flag).then((data) => {
            data = this.state.tableHeaders.concat(JSON.parse(data.text));
            this.setState({pending: false, data: data});
        }, (err) => {
            //TODO handle error
        });
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
        sendRequest('https://young-cliffs-79659.herokuapp.com/deleteEmployee', {id: id})
            .then((data) => {
                console.log("data's deleted successfully");
                this.setState({sending: false});
            }, (err) => {
                //TODO handle error
            });
    }

    handlerCancelBtn() {
        this.setState({
            subHeader: "Employees",
            showTable: true,
            showDetails: false,
            showAddForm: false,
            addBtnClicked: false,
            editData: null
        });
        this.state.employedBefore ? this.handlerEmployedBtn() : this.handlerFormerBtn();
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
            url = 'https://young-cliffs-79659.herokuapp.com/registration';
        }
        else {  //edit the employee
            url = 'https://young-cliffs-79659.herokuapp.com/editEmployee';
            data['email'] = this.state.editData.email;
            this.setState({editData: null});
        }

        sendRequest(url, data)
            .then(() => {
                console.log("data sent successfully");
                this.setState({sending: false});
                this.handlerCancelBtn();
            }, (err) => {
                console.log(err);
                this.setState({
                    sending: false,
                    errorMsg: JSON.parse(err.text).errors[0].message
                });
            });
    }

    render() {
        let clsBtn = "btn btn-info ";

        let content = null;

        if (this.state.showTable) {
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

            content = (
                <div>
                    {LeftBtnToolbar}
                    {this.state.former == "default" ? RightToolbar : null}
                    <Table TableData={this.state.data}
                           onEdit={this.state.former == "default" ? this.handlerEditBtn.bind(this) : null}
                           onRemove={this.handlerRemove.bind(this)}
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

        return (
            <div>
                <h2 className="page-header">{this.state.subHeader}</h2>

                {this.state.pending ? <Loading /> : content}
            </div>
        );
    }
}