import React from 'react';

import Table from '../Components/Table.jsx';
import EmployeeForm from '../Components/EmployeeForm.jsx';
import FormButtons from '../Components/FormButtons.jsx';


export default class Employees extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showTable: true,
            showAddForm: false,
            subHeader: "Employees"
        };

        this.handlerAddBtn = this.handlerAddBtn.bind(this);
        this.handlerEditBtn = this.handlerEditBtn.bind(this);
        this.handlerCancelBtn = this.handlerCancelBtn.bind(this);
        this.handlerSubmitBtn = this.handlerSubmitBtn.bind(this);
    }

    handlerAddBtn() {
        this.setState({
            showTable: false,
            showAddForm: true,
            subHeader: "Create new employee"
        })
    }

    handlerEditBtn() {

    }

    handlerCancelBtn() {
        this.setState({
            showTable: true,
            showAddForm: false,
            subHeader: "Employees"
        })
    }

    handlerSubmitBtn() {
        //TODO send form to backend
    }

    render() {

        var Form = (
            <div>
                <EmployeeForm />
                <FormButtons Submit={this.handlerSubmitBtn} Cancel={this.handlerCancelBtn}/>
            </div>
        );

        var FAKEservicesDATA = [
            {name: "Name", desc: "Description", price: "Price"},
            {name: "service1", desc: "desc", price: 400},
            {name: "service2", desc: "desc", price: 400},
            {name: "service3", desc: "desc", price: 400}
        ];

        return (
            <div>
                <h2 className="page-header">{this.state.subHeader}</h2>

                <RightBtnToolbar Add={this.handlerAddBtn} Edit={this.handlerEditBtn}/>

                {this.state.showTable ?
                    <Table TableData={FAKEservicesDATA}/> : Form}
            </div>
        );
    }
}