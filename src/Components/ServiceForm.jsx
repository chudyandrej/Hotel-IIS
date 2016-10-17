import React from 'react';

import InputLabelForm from './InputLabelForm.jsx';


export default class ServiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
            price: null
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);

    }

    handleNameChange(evt) {
        this.setState({name: evt.target.value});
    }

    handleDescChange(evt) {
        this.setState({name: evt.target.value});
    }

    handlePriceChange(evt) {
        this.setState({name: evt.target.value});
    }


    render() {
        var tableStyle = {
            clear: "both"
        };
        return (
            <form style={tableStyle}>

                <InputLabelForm label="Name" type="text" onChange={this.handleNameChange}/>

                <InputLabelForm label="Description" type="text" onChange={this.handleDescChange}/>

                <InputLabelForm label="Price" type="text" onChange={this.handlePriceChange}/>

            </form>
        );
    }
}