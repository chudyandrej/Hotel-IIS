import React from 'react';

import InputLabelForm from './InputLabelForm.jsx';
import FormButtons from '../Buttons/FormButtons.jsx';


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

                passwordMatch: null,
                firstNameRequired: null,
                lastNameRequired: null,
                emailRequired: null,
                passwordRequired: null,
                addressRequired: null,
                cityRequired: null,
                stateRequired: null,
                phoneNumberRequired: null,
                ibanRequired: null

            };
        }
        else {  //if editing, restore data
            this.state = {
                firstName: this.props.editData.first_name,
                middleName: this.props.editData.middle_name,
                lastName: this.props.editData.last_name,
                email: this.props.editData.email,
                password: this.props.editData.password,
                passwordCheck: null,
                address: this.props.editData.address,
                city: this.props.editData.city,
                state: this.props.editData.state,
                phoneNumber: this.props.editData.phone_number,
                iban: this.props.editData.iban,
                permissions: this.props.editData.permissions,

                passwordMatch: null,
                firstNameRequired: null,
                lastNameRequired: null,
                emailRequired: null,
                passwordRequired: null,
                addressRequired: null,
                cityRequired: null,
                stateRequired: null,
                phoneNumberRequired: null,
                ibanRequired: null
            };
        }
    }

    handlerOnChange(name, evt) {
        //TODO check length of password
        //TODO if short =>  this.state.weakPassword = true
        var state = {};
        state[name] = evt.target.value;
        this.setState(state);
    }

    checkValidity(name) {
        var state = {};
        if (this.state[name] == ""){
            state[name+"Required"] = "has-error";
        }
        if (this.state[name] != "" && this.state[name+"Required"] != null){
            state[name+"Required"] = null;
        }
        if (name == "password") {
            if (this.state.password == this.state.passwordCheck) {
                state["passwordMatch"] = "has-success";
            }
            else {
                state["passwordMatch"] = "has-error";
            }
        }
        this.setState(state);
    }

    handlerSubmitBtn() {
        var data = {
            first_name: this.state.firstName,
            middle_name: this.state.middleName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            phone_number: this.state.phoneNumber,
            iban: this.state.iban,
            permissions: this.state.permissions
        };
        this.props.Submit(data);
    }

    render() {
        var tableStyle = {
            clear: "both"
        };

        var required = "This field is required!";
        var EmailHelp = "example@domain.com";
        var passwordHelp = "Confirm the password";
        var permissionsHelp = <small className="form-text text-muted">Set user's permissions to the system</small>;

        var passwords = (
            <div>
                <InputLabelForm label="Password"
                                type="text"
                                placeholder={this.state.password}
                                required={true}
                                validity={this.state.passwordRequired}
                                onBlur={this.checkValidity.bind(this, "password")}
                                onChange={this.handlerOnChange.bind(this, "password")}
                                errorMsg={this.state.passwordRequired == null ? null : required}/>

                <InputLabelForm label="Password"
                                type="password"
                                placeholder={this.state.passwordCheck}
                                validity={this.state.passwordMatch}
                                onBlur={this.checkValidity.bind(this, "password")}
                                onChange={this.handlerOnChange.bind(this, "passwordCheck")}
                                help={passwordHelp}/>
            </div>
        );

        return (
            <div>
                <form style={tableStyle}>
                    <InputLabelForm label="First Name"
                                    type="text"
                                    placeholder={this.state.firstName}
                                    required={true}
                                    validity={this.state.firstNameRequired}
                                    onBlur={this.checkValidity.bind(this, "firstName")}
                                    onChange={this.handlerOnChange.bind(this, "firstName")}
                                    errorMsg={this.state.firstNameRequired == null ? null : required}/>

                    <InputLabelForm label="Middle Name"
                                    type="text"
                                    placeholder={this.state.middleName}
                                    onChange={this.handlerOnChange.bind(this, "middleName")}/>

                    <InputLabelForm label="Last Name"
                                    type="text"
                                    placeholder={this.state.lastName}
                                    required={true}
                                    validity={this.state.lastNameRequired}
                                    onBlur={this.checkValidity.bind(this, "lastName")}
                                    onChange={this.handlerOnChange.bind(this, "lastName")}
                                    errorMsg={this.state.lastNameRequired == null ? null : required}/>

                    <InputLabelForm label="Email"
                                    type="text"
                                    placeholder={this.state.email}
                                    required={true}
                                    validity={this.state.emailRequired}
                                    onBlur={this.checkValidity.bind(this, "email")}
                                    onChange={this.handlerOnChange.bind(this, "email")}
                                    errorMsg={this.state.emailRequired == null ? null : required}
                                    help={EmailHelp}/>

                    <InputLabelForm label="Address"
                                    type="text"
                                    placeholder={this.state.address}
                                    required={true}
                                    validity={this.state.addressRequired}
                                    onBlur={this.checkValidity.bind(this, "address")}
                                    onChange={this.handlerOnChange.bind(this, "address")}
                                    errorMsg={this.state.addressRequired == null ? null : required}/>

                    <InputLabelForm label="City"
                                    type="text"
                                    placeholder={this.state.city}
                                    required={true}
                                    validity={this.state.cityRequired}
                                    onBlur={this.checkValidity.bind(this, "city")}
                                    onChange={this.handlerOnChange.bind(this, "city")}
                                    errorMsg={this.state.cityRequired == null ? null : required}/>

                    <InputLabelForm label="State"
                                    type="text"
                                    placeholder={this.state.state}
                                    required={true}
                                    validity={this.state.stateRequired}
                                    onBlur={this.checkValidity.bind(this, "state")}
                                    onChange={this.handlerOnChange.bind(this, "state")}
                                    errorMsg={this.state.stateRequired == null ? null : required}/>

                    <InputLabelForm label="Phone Number"
                                    type="text"
                                    placeholder={this.state.phoneNumber}
                                    required={true}
                                    validity={this.state.phoneNumberRequired}
                                    onBlur={this.checkValidity.bind(this, "phoneNumber")}
                                    onChange={this.handlerOnChange.bind(this, "phoneNumber")}
                                    errorMsg={this.state.phoneNumberRequired == null ? null : required}/>

                    <InputLabelForm label="IBAN"
                                    type="text"
                                    placeholder={this.state.iban}
                                    required={true}
                                    validity={this.state.ibanRequired}
                                    onBlur={this.checkValidity.bind(this, "iban")}
                                    onChange={this.handlerOnChange.bind(this, "iban")}
                                    errorMsg={this.state.ibanRequired == null ? null : required}/>

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

                    {this.state.permissions == "none" ? null : passwords}
                </form>

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.props.Cancel}
                             errorMsg={this.props.errorMsg}
                             pending={this.props.pending}/>
            </div>
        );
    }
}