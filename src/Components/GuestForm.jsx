import React from 'react';

import InputLabelForm from './InputLabelForm.jsx';


export default class GuestForm extends React.Component {

    render() {
        var tableStyle = {
            clear: "both"
        };
        var EmailHelp = <small className="form-text text-muted">example@domain.com</small>;

        return (
            <form style={tableStyle}>

                <InputLabelForm label="Name" type="text" onChange={this.props.onChange.bind(this, "name")}/>

                <InputLabelForm label="Surname" type="text" onChange={this.props.onChange.bind(this, "surname")}/>

                <InputLabelForm label="Email" type="text" onChange={this.props.onChange.bind(this, "email")}
                                help={EmailHelp}/>

                <InputLabelForm label="Address" type="text" onChange={this.props.onChange.bind(this, "address")}/>

                <InputLabelForm label="City" type="text" onChange={this.props.onChange.bind(this, "city")}/>

                <InputLabelForm label="State" type="text" onChange={this.props.onChange.bind(this, "state")}/>

                <InputLabelForm label="Phone Number" type="text" onChange={this.props.onChange.bind(this, "phone")}/>

                <InputLabelForm label="IBAN" type="text" onChange={this.props.onChange.bind(this, "iban")}/>

            </form>

        );
    }
}