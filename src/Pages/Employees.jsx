import React from 'react';

import Table from '../Components/Table.jsx';
import EmployeeForm from '../Components/Forms/EmployeeForm.jsx';
import RightBtnToolbar from '../Components/RightBtnToolbar.jsx';


export default class Employees extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showTable: true,
            showAddForm: false,
            subHeader: "Employees",
            addBtnClicked: false,
            removeAction: false
        };
       // this.stateSetter = this.stateSetter.bind(this);
    }

    handlerAddBtn() {
        this.setState({
            showTable: false,
            showAddForm: true,
            subHeader: "Add a new employee",
            addBtnClicked: true,
            removeAction: false
        })
    }

    handlerRemoveBtn() {
        this.setState({removeAction: !this.state.removeAction});
    }

    handlerCancelBtn() {
        this.setState({
            showTable: true,
            showAddForm: false,
            subHeader: "Employees",
            addBtnClicked: false
        })
    }

    handlerSubmitBtn(data) {
        //TODO send form to backend
    }

    render() {

        var Form = (
            <div>
                <EmployeeForm Submit={this.handlerSubmitBtn.bind(this)}
                              Cancel={this.handlerCancelBtn.bind(this)}/>

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
                           onRemove={this.handlerRemoveBtn}
                           RemoveAction={this.state.removeAction}/> : Form}
            </div>
        );
    }
}