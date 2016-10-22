import React from 'react';

import InputLabelForm from './InputLabelForm.jsx';
import FormButtons from './FormButtons.jsx';


export default class GuestForm extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            name: null,
            surname: null,
            email: null,
            address: null,
            city: null,
            state: null,
            phoneNumber: null,
            iban: null,
        };
    }

    handlerOnChange(name, evt){
        switch (name){
            case "name":
                this.setState({name: evt.target.value}); break;
            case "surname":
                this.setState({surname: evt.target.value}); break;
            case "email":
                this.setState({email: evt.target.value}); break;
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

    checkValidity(name) {
        switch(name){

        }
    }

    handlerSubmitBtn() {
        var data = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
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

        return (
            <div>
                <form style={tableStyle}>

                    <InputLabelForm label="Name" type="text" onChange={this.handlerOnChange.bind(this, "name")}/>

                    <InputLabelForm label="Surname" type="text" onChange={this.handlerOnChange.bind(this, "surname")}/>

                    <InputLabelForm label="Email" type="text" onChange={this.handlerOnChange.bind(this, "email")}
                                    help={EmailHelp}/>

                    <InputLabelForm label="Address" type="text" onChange={this.handlerOnChange.bind(this, "address")}/>

                    <InputLabelForm label="City" type="text" onChange={this.handlerOnChange.bind(this, "city")}/>

                    <InputLabelForm label="State" type="text" onChange={this.handlerOnChange.bind(this, "state")}/>

                    <InputLabelForm label="Phone Number" type="text" onChange={this.handlerOnChange.bind(this, "phone")}/>

                    <InputLabelForm label="IBAN" type="text" onChange={this.handlerOnChange.bind(this, "iban")}/>

                </form>

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)} Cancel={this.props.Cancel}/>
            </div>
        );
    }
}