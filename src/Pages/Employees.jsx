import React from 'react';

import Table from '../Components/Table.jsx';
import EmployeeForm from '../Components/EmployeeForm.jsx';
import FormButtons from '../Components/FormButtons.jsx';
import RightBtnToolbar from '../Components/RightBtnToolbar.jsx';


export default class Employees extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showTable: true,
            showAddForm: false,
            subHeader: "Employees",
            addBtnClicked: false,
            removeAction: false,

            name: null,
            surname: null,
            email: null,
            password: null,
            passwordCheck: null,
            address: null,
            city: null,
            state: null,
            phoneNumber: null,
            iban: null,

            passwordMatch: ""
        };
        //this.handlerOnChange = this.handlerOnChange.bind(this);
    }

    handlerAddBtn() {
        this.setState({
            showTable: false,
            showAddForm: true,
            subHeader: "Add a new employee",
            addBtnClicked: true
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

    handlerOnChange(name, evt){
        console.log(name);
        switch (name){
            case "name":
                this.setState({name: evt.target.value}); break;
            case "surname":
                this.setState({surname: evt.target.value}); break;
            case "email":
                this.setState({email: evt.target.value}); break;
            case "password":
                //TODO check length of password
                //TODO if short =>  this.state.weakPassword = true
                this.setState({password: evt.target.value}); break;
            case "passwordCheck":
                this.setState({passwordCheck: evt.target.value}); break;
            case "address":
                this.setState({address: evt.target.value}); break;
            case "city":
                this.setState({city: evt.target.value}); break;
            case "state":
                this.setState({state: evt.target.value}); break;
            case "phone":
                this.setState({phoneNumber: evt.target.value}); break;
            case "iban":
                this.setState({iban: evt.target.value}); break;
        }
    }

    checkPasswordMatch() {
        if (this.state.password == this.state.passwordCheck) {
            this.setState({passwordMatch: "has-success"});
        }
        else {
            this.setState({passwordMatch: "has-error"});
        }
        console.log(this.state.passwordMatch);
    }

    handlerSubmitBtn() {
        //TODO send form to backend
    }

    render() {

        var Form = (
            <div>
                <EmployeeForm onChange={this.handlerOnChange}
                              passwordMatch={this.state.passwordMatch}
                              onBlur={this.checkPasswordMatch}/>
                <FormButtons Submit={this.handlerSubmitBtn.bind(this)} Cancel={this.handlerCancelBtn.bind(this)}/>
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