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
                phoneNumber: "",
                iban: "",
                idCardNumber: "",
                typeOfGuest: "person",
                nameCompany: "",
                ico: "",
                dic: ""
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
                phoneNumber: this.props.editData.phoneNumber,
                iban: this.props.editData.iban,
                idCardNumber: this.props.editData.idCardNumber,
                typeOfGuest: this.props.editData.typeOfGuest,
                nameCompany: this.props.editData.nameCompany,
                ico: this.props.editData.ico,
                dic: this.props.editData.dic,
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
            case "address":
                this.setState({address: evt.target.value});
                break;
            case "city":
                this.setState({city: evt.target.value});
                break;
            case "state":
                this.setState({state: evt.target.value});
                break;
            case "phoneNumber":
                this.setState({phoneNumber: evt.target.value});
                break;
            case "iban":
                this.setState({iban: evt.target.value});
                break;
            case "typeOfGuest":
                this.setState({typeOfGuest: evt.target.value});
                break;
            case "nameCompany":
                this.setState({nameCompany: evt.target.value});
                break;
            case "ico":
                this.setState({ico: evt.target.value});
                break;
            case "dic":
                this.setState({dic: evt.target.value});
                break;
        }
    }

    checkValidity(name) {
        switch (name) {

        }
    }

    handlerSubmitBtn() {
        var data = {
            first_name: this.state.firstName,
            middle_name: this.state.middleName,
            last_name: this.state.lastName,
            email: this.state.email,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            phoneNumber: this.state.phoneNumber,
            iban: this.state.iban,
            idCardNumber: this.state.idCardNumber,
            typeOfGuest: this.state.typeOfGuest,
            nameCompany: this.state.nameCompany,
            ico: this.state.ico,
            dic: this.state.dic,
        };

        this.props.Submit(data);
    }

    render() {
        var tableStyle = {
            clear: "both"
        };

        var EmailHelp = <small className="form-text text-muted">example@domain.com</small>;

        var companyInfo = (
            <div>
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
                                    onChange={this.handlerOnChange.bind(this, "firstName")}/>

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
                                    onChange={this.handlerOnChange.bind(this, "phoneNumber")}/>

                    <InputLabelForm label="IBAN"
                                    type="text"
                                    placeholder={this.state.iban}
                                    onChange={this.handlerOnChange.bind(this, "iban")}/>

                    <InputLabelForm label="ID Card Number"
                                    type="text"
                                    placeholder={this.state.idCardNumber}
                                    onChange={this.handlerOnChange.bind(this, "idCardNumber")}/>

                    <div className="form-group row ">
                        <label className="col-xs-2 col-form-label">Individual/Corporation:</label>
                        <div className="col-xs-6">
                            <select className="form-control"
                                    value={this.state.typeOfGuest}
                                    onChange={this.handlerOnChange.bind(this, "typeOfGuest")}>
                                <option value="person">Individual</option>
                                <option value="company">Corporation</option>
                            </select>
                        </div>
                    </div>

                    {this.state.typeOfGuest == "person" ? null : companyInfo}
                </form>

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.props.Cancel}
                             pending={this.props.pending}/>
            </div>
        );
    }
}