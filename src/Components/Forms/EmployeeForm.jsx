import React from 'react';

import InputLabelForm from './InputLabelForm.jsx';
import FormButtons from './FormButtons.jsx';


export default class EmployeeFormForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: this.props.editData.name,
            surname: this.props.editData.surname,
            email: this.props.editData.email,
            password: this.props.editData.password,
            passwordCheck: this.props.editData.passwordCheck,
            address: this.props.editData.address,
            city: this.props.editData.city,
            state: this.props.editData.state,
            phoneNumber: this.props.editData.phoneNumber,
            iban: this.props.editData.iban,

            passwordMatch: ""
        };
    }

    handlerOnChange(name, evt) {
        switch (name) {
            case "name":
                this.setState({name: evt.target.value});
                break;
            case "surname":
                this.setState({surname: evt.target.value});
                break;
            case "email":
                this.setState({email: evt.target.value});
                break;
            case "password":
                //TODO check length of password
                //TODO if short =>  this.state.weakPassword = true
                this.setState({password: evt.target.value});
                break;
            case "passwordCheck":
                this.setState({passwordCheck: evt.target.value});
                break;
            case "address":
                this.setState({address: evt.target.value});
                break;
            case "city":
                this.setState({city: evt.target.value});
                break;
            case "state":
                this.setState({state: evt.target.value});
                break;
            case "phone":
                this.setState({phoneNumber: evt.target.value});
                break;
            case "iban":
                this.setState({iban: evt.target.value});
                break;
        }
    }

    checkValidity(name) {
        switch (name) {
            case "password":
                if (this.state.password == this.state.passwordCheck) {
                    this.setState({passwordMatch: "has-success"});
                }
                else {
                    this.setState({passwordMatch: "has-error"});
                }
                break;
        }
    }

    handlerSubmitBtn() {
        var data = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            passwordCheck: this.state.passwordCheck,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            phoneNumber: this.state.phoneNumber,
            iban: this.state.iban,
        };

        this.props.Submit(data);
    }

    render() {
        var tableStyle = {
            clear: "both"
        };

        var EmailHelp = <small className="form-text text-muted">example@domain.com</small>;
        var passwordHelp = <small className="form-text text-muted">Confirm your password.</small>;

        return (
            <div>
                <form style={tableStyle}>
                    <InputLabelForm label="Name"
                                    type="text"
                                    placeholder={this.state.name}
                                    onChange={this.handlerOnChange.bind(this, "name")}/>

                    <InputLabelForm label="Surname"
                                    type="text"
                                    placeholder={this.state.surname}
                                    onChange={this.handlerOnChange.bind(this, "surname")}/>

                    <InputLabelForm label="Email"
                                    type="text"
                                    placeholder={this.state.email}
                                    onChange={this.handlerOnChange.bind(this, "email")}
                                    help={EmailHelp}/>

                    <InputLabelForm label="Password"
                                    type="password"
                                    placeholder={this.state.password}
                                    onChange={this.handlerOnChange.bind(this, "password")}/>

                    <InputLabelForm label="Password"
                                    type="password"
                                    placeholder={this.state.passwordCheck}
                                    validity={this.state.passwordMatch}
                                    onBlur={this.checkValidity.bind(this, "password")}
                                    onChange={this.handlerOnChange.bind(this, "passwordCheck")}
                                    help={passwordHelp}/>

                    <InputLabelForm label="Address"
                                    type="text"
                                    placeholder={this.state.address}
                                    onChange={this.handlerOnChange.bind(this, "address")}/>

                    <InputLabelForm label="City"
                                    type="text"
                                    placeholder={this.state.city}
                                    onChange={this.handlerOnChange.bind(this, "city")}/>

                    <InputLabelForm label="State"
                                    type="text"
                                    placeholder={this.state.state}
                                    onChange={this.handlerOnChange.bind(this, "state")}/>

                    <InputLabelForm label="Phone Number"
                                    type="text"
                                    placeholder={this.state.phoneNumber}
                                    onChange={this.handlerOnChange.bind(this, "phone")}/>

                    <InputLabelForm label="IBAN"
                                    type="text"
                                    placeholder={this.state.iban}
                                    onChange={this.handlerOnChange.bind(this, "iban")}/>
                </form>

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)} Cancel={this.props.Cancel}/>
            </div>
        );
    }
}