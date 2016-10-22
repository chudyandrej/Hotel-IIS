import React from 'react';

import Table from '../Components/Table.jsx';
import EmployeeForm from '../Components/Forms/EmployeeForm.jsx';
import RightBtnToolbar from '../Components/RightBtnToolbar.jsx';


export default class Employees extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            subHeader: "Employees",

            showTable: true,
            showAddForm: false,
            addBtnClicked: false,
            removeAction: false,

            editData: null
        };
        // this.stateSetter = this.stateSetter.bind(this);
    }

    handlerEditBtn(data) {
        // data = data which sends the row, which a user wants to edit
        this.setState({
            subHeader: "Edit the employee",
            showTable: false,
            showAddForm: false,
            addBtnClicked: false,
            removeAction: false,

            editData: data
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

    handlerCancelBtn() {
        this.setState({
            subHeader: "Employees",
            showTable: true,
            showAddForm: false,
            addBtnClicked: false
        });
    }

    handlerSubmitBtn(data) {
        //TODO send form to backend
    }

    render() {

        var Form = (
            <div>
                <EmployeeForm Submit={this.handlerSubmitBtn.bind(this)}
                              Cancel={this.handlerCancelBtn.bind(this)}
                              editData={this.state.editData}/>

            </div>
        );

        var FAKEservicesDATA = [
            {name: "Name", desc: "Description", price: "Salary"},
            {name: "Emp1", desc: "desc", price: 400},
            {name: "Emp2", desc: "desc", price: 400},
            {name: "Emp3", desc: "desc", price: 400}
        ];

        return (
            <div>
                <h2 className="page-header">{this.state.subHeader}</h2>

                <RightBtnToolbar Add={this.handlerAddBtn.bind(this)}
                                 AddState={this.state.addBtnClicked}
                                 Remove={this.handlerRemoveBtn.bind(this)}/>

                {this.state.showTable ?
                    <Table TableData={FAKEservicesDATA}
                           onEdit={this.handlerEditBtn.bind(this)}
                           onRemove={this.handlerRemoveBtn}
                           RemoveAction={this.state.removeAction}/> : Form}
            </div>
        );
    }
}