import React from 'react';

import InputLabelForm from './InputLabelForm.jsx';


export default class ServiceForm extends React.Component {

    render() {
        var tableStyle = {
            clear: "both"
        };
        return (
            <form style={tableStyle}>

                <InputLabelForm label="Name" type="text" onChange={this.props.onChange.bind(this, "name")}/>

                <InputLabelForm label="Description" type="text" onChange={this.props.onChange.bind(this, "desc")}/>

                <InputLabelForm label="Price" type="text" onChange={this.props.onChange.bind(this, "price")}/>

            </form>
        );
    }
}