import React from 'react';

import InputLabelForm from './InputLabelForm.jsx';
import FormButtons from './FormButtons.jsx';

export default class ServiceForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: null,
            description: null,
            price: null
        };
    }

    handlerOnChange(name, evt){
        console.log(name);
        switch (name){
            case "name":
                this.setState({name: evt.target.value}); break;
            case "desc":
                this.setState({description: evt.target.value}); break;
            case "price":
                this.setState({price: evt.target.value}); break;
        }
    }

    checkValidity(name) {
        switch(name) {

        }
    }

    handlerSubmitBtn() {
        var data = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
        };

        this.props.Submit(data);
    }

    render() {
        var tableStyle = {
            clear: "both"
        };
        return (
            <div>
                <form style={tableStyle}>

                    <InputLabelForm label="Name" type="text" onChange={this.handlerOnChange.bind(this, "name")}/>

                    <InputLabelForm label="Description" type="text" onChange={this.handlerOnChange.bind(this, "desc")}/>

                    <InputLabelForm label="Price" type="text" onChange={this.handlerOnChange.bind(this, "price")}/>

                </form>

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)} Cancel={this.props.Cancel}/>
            </div>
        );
    }
}