import React from 'react';

import InputLabelForm from './InputLabelForm.jsx';
import FormButtons from './FormButtons.jsx';


export default class EmployeeFormForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        if (this.props.editData == null) {
            this.state = {
                firstName: "",
                middleName: "",
                lastName: "",
                email: "",
                password: "",
                passwordCheck: "",
                address: "",
                city: "",
                state: "",
                phoneNumber: "",
                iban: "",
                permissions: "none",

                passwordMatch: "",
                firstNameRequired: null
            };
        }
        else {  //if editing, restore data
            this.state = {
                firstName: this.props.editData.firstName,
                middleName: this.props.editData.middleName,
                lastName: this.props.editData.lastName,
                email: this.props.editData.email,
                password: this.props.editData.password,
                passwordCheck: this.props.editData.passwordCheck,
                address: this.props.editData.address,
                city: this.props.editData.city,
                state: this.props.editData.state,
                phoneNumber: this.props.editData.phoneNumber,
                iban: this.props.editData.iban,
                permissions: this.props.editData.permissions,

                passwordMatch: "",
                firstNameRequired: false
            };
        }
    }

    handlerOnChange(name, evt) {
        switch (name) {
            case "firstName":
                this.setState({firstName: evt.target.value});
                break;
            case "middleName":
                this.setState({middleName: evt.target.value});
                break;
            case "lastName":
                this.setState({lastName: evt.target.value});
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
            case "permissions":
                this.setState({permissions: evt.target.value});
                break;
        }
    }

    checkValidity(name) {
        switch (name) {
            case "firstName":
                if (this.state.firstName == "") {
                    this.setState({firstNameRequired: "has-error"})
                }
                if (this.state.firstNameRequired != null && this.state.firstName != "") {
                    this.setState({firstNameRequired: null})
                }
                break;
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
            first_name: this.state.firstName,
            middle_name: this.props.editData.middleName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            phone_number: this.state.phoneNumber,
            iban: this.state.iban,
            permissions: this.props.editData.permissions
        };

        this.props.Submit(data);
    }

    render() {
        var tableStyle = {
            clear: "both"
        };

        var required = "This field is required!";
        var EmailHelp = "example@domain.com";
        var passwordHelp = "Confirm your password";
        var permissionsHelp = <small className="form-text text-muted">Set user's permissions to the system</small>;

        return (
            <div>
                <form style={tableStyle}>
                    <InputLabelForm label="First Name"
                                    type="text"
                                    placeholder={this.state.firstName}
                                    onBlur={this.checkValidity.bind(this, "firstName")}
                                    onChange={this.handlerOnChange.bind(this, "firstName")}
                                    validity={this.state.firstNameRequired}
                                    errorMsg={this.state.firstNameRequired == null ? null : required}/>

                    <InputLabelForm label="Middle Name"
                                    type="text"
                                    placeholder={this.state.middleName}
                                    onChange={this.handlerOnChange.bind(this, "middleName")}/>

                    <InputLabelForm label="Last Name"
                                    type="text"
                                    placeholder={this.state.lastName}
                                    onChange={this.handlerOnChange.bind(this, "lastName")}/>

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

                    <div className="form-group row ">
                        <label className="col-xs-2 col-form-label">Permissions:</label>
                        <div className="col-xs-6">
                            <select className="form-control"
                                    value={this.state.permissions}
                                    onChange={this.handlerOnChange.bind(this, "permissions")}>
                                <option value="none">None</option>
                                <option value="user">User</option>
                                <option value="root">Root</option>
                            </select>
                            {permissionsHelp}
                        </div>
                    </div>
                </form>

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)} Cancel={this.props.Cancel}/>
            </div>
        );
    }
}