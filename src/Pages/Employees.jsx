import React from 'react';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
import DetailsTable from '../Components/DetailsTable.jsx';
import EmployeeForm from '../Components/Forms/EmployeeForm.jsx';
import Loading from '../Components/Loading.jsx';
import RightBtnToolbar from '../Components/Buttons/RightBtnToolbar.jsx';
import Table from '../Components/Table.jsx';

import {sendRequest} from '../Functions/HTTP-requests.js';


export default class Employees extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            employed: "active",
            all: "default",
            subHeader: "Employees",
            tableHeaders: [{first_name: "First Name", last_name: "Family name", permissions: "Permissions"}],
            detailsHeaders: {first_name: "First Name:", middle_name: "Middle Name:", last_name: "Family name:",
                permissions: "Permissions:", password: "Password:", email: "Email:", phoneNumber: "Phone number:",
                idCardNumber: "Card Number:", nameCompany: "Company Name:", ico: "ICO:", dic: "DIC:",
                address: "Address:", city: "City:", state: "State:"},


            showTable: true,
            showAddForm: false,
            showDetails: false,
            addBtnClicked: false,
            removeAction: false,

            editData: null,
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
        sendRequest('https://young-cliffs-79659.herokuapp.com/getEmployees', {}).then((data)=>{
            data = this.state.tableHeaders.concat(JSON.parse(data.text));
            this.setState({pending: false, data: data});
        }, (err)=>{
            //TODO handle error
        });
    }

    handlerEditBtn(data) {
        // data = data are sent by the row, which a user wants to edit
        this.setState({
            subHeader: "Edit the employee",
            showTable: false,
            showAddForm: false,
            addBtnClicked: false,
            removeAction: false,

            editData: data
        });
    }

    handlerEmployedBtn() {
        this.setState({
            employed: "active",
            all: "default",
            subHeader: "Employees"
        });
    }

    handlerAllBtn() {
        this.setState({
            employed: "default",
            all: "active",
            subHeader: "Former Employees"
        });
    }

    handlerAddBtn() {
        this.setState({
            subHeader: "Add a new employee",
            showTable: false,
            showAddForm: true,
            addBtnClicked: true,
            removeAction: false
        });
    }

    handlerRemoveBtn() {
        this.setState({removeAction: !this.state.removeAction});
    }

    handlerRemove(id) {
        sendRequest('https://young-cliffs-79659.herokuapp.com/deleteEmployee', {id: id})
            .then((data)=>{
                console.log("data's deleted successfully");
                this.setState({sending: false});
            }, (err)=>{
                //TODO handle error
            });
    }

    handlerCancelBtn() {
        this.setState({
            subHeader: "Employees",
            showTable: true,
            showAddForm: false,
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
        this.setState({sending: true});
        var url = null;

        if (this.state.editData == null) {  //add a new employee
            url = 'https://young-cliffs-79659.herokuapp.com/registration';
        }
        else {  //edit the employee
            url = 'https://young-cliffs-79659.herokuapp.com/editEmployee';
            data['id'] = this.state.editData.id;
        }

        sendRequest(url, data)
            .then(()=>{
                console.log("data sent successfully");
                this.setState({sending: false});
                this.handlerCancelBtn();
            }, (err)=>{
                //TODO handle error
            });
    }

    render() {
        var clsBtn = "btn btn-info ";

        var content = null;

        if (this.state.showTable) {
            var LeftBtnToolbar = (
                <div className='btn-toolbar pull-left'>
                    <button type="button"
                            className={clsBtn + this.state.employed}
                            onClick={this.handlerEmployedBtn.bind(this)}>
                        Employed
                    </button>
                    <button type="button"
                            className={clsBtn + this.state.all}
                            onClick={this.handlerAllBtn.bind(this)}>
                        Former
                    </button>
                </div>
            );

            content = (
                <div>
                    {LeftBtnToolbar}
                    <Table TableData={this.state.data}
                           onEdit={this.handlerEditBtn.bind(this)}
                           onRemove={this.handlerRemoveBtn}
                           showDetails={this.handleShowDetails.bind(this)}
                           RemoveAction={this.state.removeAction}/>
                </div>
            )
        }
        else if (this.state.showDetails) {
            content = (
                <div>
                    <BackBtn onClick={this.handlerBackBtn.bind(this)} />
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
                              pending={this.state.sending}/>
            )
        }

        return (
            <div>
                <h2 className="page-header">{this.state.subHeader}</h2>

                {this.state.showDetails ? null : <RightBtnToolbar Add={this.handlerAddBtn.bind(this)}
                                                                  AddState={this.state.addBtnClicked}
                                                                  Remove={this.handlerRemoveBtn.bind(this)}/> }

                {this.state.pending ? <Loading /> : content}
            </div>
        );
    }
}