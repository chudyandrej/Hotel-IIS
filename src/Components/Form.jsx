import React from 'react';


export default class Form extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            surname: null,
            email: null,
            password: null,
            passwordCheck: null,
            passwordMatch: "",
            address: null,
            city: null,
            state: null,
            phoneNumber: null,
            iban: null
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordCheckChange = this.handlePasswordCheckChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleIbanChange = this.handleIbanChange.bind(this);
        this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
    }

    handleNameChange(evt) {
        this.setState({name: evt.target.value});
    }

    handleSurnameChange(evt) {
        this.setState({surname: evt.target.value});
    }

    handleEmailChange(evt) {
        this.setState({email: evt.target.value});
    }

    handlePasswordChange(evt) {
        //TODO check length of password
        //TODO if short =>  this.state.weakPassword = true
        this.setState({password: evt.target.value});
    }

    handlePasswordCheckChange(evt) {
        this.setState({ passwordCheck: evt.target.value});
    }

    handleAddressChange(evt) {
        this.setState({address: evt.target.value});
    }

    handleCityChange(evt) {
        this.setState({city: evt.target.value});
    }

    handleStateChange(evt) {
        this.setState({state: evt.target.value});
    }

    handlePhoneNumberChange(evt) {
        this.setState({phoneNumber: evt.target.value});
    }

    handleIbanChange(evt) {
        this.setState({iban: evt.target.value});
    }

    checkPasswordMatch() {
        if (this.state.password == this.state.passwordCheck) {
            this.setState({passwordMatch: "has-success"});
        }
        else {
            this.setState({passwordMatch: "has-error"});
        }
    }

    render() {
        var tableStyle = {
            clear: "both"
        };
        return (
            <form style={tableStyle}>
                <div className="form-group row">
                    <label className="col-xs-2 col-form-label">Name:</label>
                    <div className="col-xs-6">
                        <input
                            className="form-control"
                            id="inputError"
                            type="text"
                            placeholder="Name"
                            onChange={this.handleNameChange}/>
                    </div>
                </div>

                <div className="form-group row has-success">
                    <label className="col-xs-2 col-form-label">Surname:</label>
                    <div className="col-xs-6">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Surname"
                            onChange={this.handleSurnameChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xs-2 col-form-label">Email:</label>
                    <div className="col-xs-6">
                        <input
                            className="form-control"
                            id="inputWarning"
                            type="text"
                            placeholder="Email"
                            onChange={this.handleEmailChange}/>
                        <small className="form-text text-muted">example@domain.com</small>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xs-2 col-form-label">Password:</label>
                    <div className="col-xs-6">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            onChange={this.handlePasswordChange}/>
                    </div>
                </div>

                <div className={"form-group row "+this.state.passwordMatch}>
                    <label className="col-xs-2 col-form-label">Password:</label>
                    <div className="col-xs-6">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            onBlur={this.checkPasswordMatch}
                            onChange={this.handlePasswordCheckChange}/>
                        <small className="form-text text-muted">Confirm your password.</small>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xs-2 col-form-label">Address:</label>
                    <div className="col-xs-6">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Address"
                            onChange={this.handleAddressChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xs-2 col-form-label">City:</label>
                    <div className="col-xs-6">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="City"
                            onChange={this.handleCityChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xs-2 col-form-label">State:</label>
                    <div className="col-xs-6">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="State"
                            onChange={this.handleStateChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xs-2 col-form-label">Phone Number:</label>
                    <div className="col-xs-6">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Phone Number"
                            onChange={this.handlePhoneNumberChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xs-2 col-form-label">IBAN:</label>
                    <div className="col-xs-6">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="IBAN"
                            onChange={this.handleIbanChange}/>
                    </div>
                </div>
            </form>
        );
    }
}