import React from 'react';

import InputLabelForm from './InputLabelForm.jsx';
import FormButtons from '../Buttons/FormButtons.jsx';


export default class GuestForm extends React.Component {

    constructor(props, context) {
        super(props, context);

        if (this.props.editData == null) {
            this.state = {
                firstName: "",
                middleName: "",
                lastName: "",
                email: "",
                address: "",
                city: "",
                state: "",
                phone_number: "",
                idcard_number: "",
                type_of_guest: "person",
                name_company: "",
                ico: "",
                dic: "",

                firstNameRequired: null,
                lastNameRequired: null,
                addressRequired: null,
                cityRequired: null,
                stateRequired: null,
                phone_numberRequired: null,
                idcard_numberRequired: null
            };
        }
        else {
            this.state = {
                firstName: this.props.editData.first_name,
                middleName: this.props.editData.middle_name,
                lastName: this.props.editData.last_name,
                email: this.props.editData.email,
                address: this.props.editData.address,
                city: this.props.editData.city,
                state: this.props.editData.state,
                phone_number: this.props.editData.phone_number,
                idcard_number: this.props.editData.idcard_number,
                type_of_guest: this.props.editData.type_of_guest,
                name_company: this.props.editData.name_company,
                ico: this.props.editData.ico,
                dic: this.props.editData.dic,

                firstNameRequired: null,
                lastNameRequired: null,
                addressRequired: null,
                cityRequired: null,
                stateRequired: null,
                phoneNumberRequired: null,
                idCardNumberRequired: null
            };
        }
    }

    handlerOnChange(name, evt) {
        let state = {};
        state[name] = evt.target.value;
        this.setState(state);
    }

    checkValidity(name) {
        let state = {};
        if (this.state[name] == ""){
            state[name+"Required"] = "has-error";
        }
        if (this.state[name] != "" && this.state[name+"Required"] != null){
            state[name+"Required"] = null;
        }
        this.setState(state);
    }

    handlerSubmitBtn() {
        let data = {
            first_name: this.state.firstName,
            middle_name: this.state.middleName,
            last_name: this.state.lastName,
            email: this.state.email,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            phone_number: this.state.phone_number,
            idcard_number: this.state.idcard_number,
            type_of_guest: this.state.type_of_guest,
            name_company: this.state.name_company,
            ico: this.state.ico,
            dic: this.state.dic,
        };

        this.props.Submit(data);
    }

    render() {
        let tableStyle = {
            clear: "both"
        };

        let required = "This field is required!";
        let EmailHelp = <small className="form-text text-muted">example@domain.com</small>;

        let companyInfo = (
            <div>
                <InputLabelForm label="Company Name"
                                type="text"
                                placeholder={this.state.name_company}
                                onChange={this.handlerOnChange.bind(this, "name_company")}/>

                <InputLabelForm label="ICO"
                                type="text"
                                placeholder={this.state.ico}
                                onChange={this.handlerOnChange.bind(this, "ico")}/>

                <InputLabelForm label="DIC"
                                type="text"
                                placeholder={this.state.dic}
                                onChange={this.handlerOnChange.bind(this, "dic")}/>
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
                                    onChange={this.handlerOnChange.bind(this, "email")}
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
                                    placeholder={this.state.phone_number}
                                    required={true}
                                    validity={this.state.phone_numberRequired}
                                    onBlur={this.checkValidity.bind(this, "phone_number")}
                                    onChange={this.handlerOnChange.bind(this, "phone_number")}
                                    errorMsg={this.state.phone_numberRequired == null ? null : required}/>

                    <InputLabelForm label="ID Card Number"
                                    type="text"
                                    placeholder={this.state.idcard_number}
                                    required={true}
                                    validity={this.state.idcard_numberRequired}
                                    onBlur={this.checkValidity.bind(this, "idcard_number")}
                                    onChange={this.handlerOnChange.bind(this, "idcard_number")}
                                    errorMsg={this.state.idcard_numberRequired == null ? null : required}/>

                    <div className="form-group row ">
                        <label className="col-xs-2 col-form-label">Person/Company:</label>
                        <div className="col-xs-6">
                            <select className="form-control"
                                    value={this.state.type_of_guest}
                                    onChange={this.handlerOnChange.bind(this, "type_of_guest")}>
                                <option value="person">Person</option>
                                <option value="company">Company</option>
                            </select>
                        </div>
                    </div>

                    {this.state.type_of_guest == "person" ? null : companyInfo}
                </form>

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.props.Cancel}
                             errorMsg={this.props.errorMsg}
                             pending={this.props.pending}/>
            </div>
        );
    }
}