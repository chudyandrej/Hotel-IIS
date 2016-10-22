import React from 'react';

import InputLabelForm from './InputLabelForm.jsx';


export default class EmployeeFormForm extends React.Component {

    render() {
        var tableStyle = {
            clear: "both"
        };
        var EmailHelp = <small className="form-text text-muted">example@domain.com</small>;
        console.log("form");
        console.log(this.props.passwordMatch);
        return (
            <form style={tableStyle}>

                <InputLabelForm label="Name" type="text" onChange={this.props.onChange.bind(this, "name")}/>

                <InputLabelForm label="Surname" type="text" onChange={this.props.onChange.bind(this, "surname")}/>

                <InputLabelForm label="Email" type="text" onChange={this.props.onChange.bind(this, "email")}
                                help={EmailHelp}/>

                <InputLabelForm label="Password" type="password" onChange={this.props.onChange.bind(this, "password")}/>

                <div className={"form-group row " + this.props.passwordMatch}>
                    <label className="col-xs-2 col-form-label">Password:</label>
                    <div className="col-xs-6">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            onBlur={this.props.onBlur.bind(this)}
                            onChange={this.props.onChange.bind(this, "passwordCheck")}/>
                        <small className="form-text text-muted">Confirm your password.</small>
                    </div>
                </div>

                <InputLabelForm label="Address" type="text" onChange={this.props.onChange.bind(this, "address")}/>

                <InputLabelForm label="City" type="text" onChange={this.props.onChange.bind(this, "city")}/>

                <InputLabelForm label="State" type="text" onChange={this.props.onChange.bind(this, "state")}/>

                <InputLabelForm label="Phone Number" type="text" onChange={this.props.onChange.bind(this, "phone")}/>

                <InputLabelForm label="IBAN" type="text" onChange={this.props.onChange.bind(this, "iban")}/>

            </form>

        );
    }
}