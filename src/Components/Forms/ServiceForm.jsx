import React from 'react';

import InputLabelForm from './InputLabelForm.jsx';
import FormButtons from '../Buttons/FormButtons.jsx';


export default class ServiceForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        if (this.props.editData == null) {
            this.state = {
                name: null,
                description: null,
                price: null,
                duration: null
            };
        }
        else {
            this.state = {
                name: this.props.editData.name,
                description: this.props.editData.description,
                price: this.props.editData.actualPrice,
                duration: this.props.editData.duration
            };
        }
    }

    handlerOnChange(name, evt) {
        switch (name) {
            case "name":
                this.setState({name: evt.target.value});
                break;
            case "desc":
                this.setState({description: evt.target.value});
                break;
            case "price":
                this.setState({price: evt.target.value});
                break;
            case "duration":
                this.setState({duration: evt.target.value});
                break;
        }
    }

    checkValidity(name) {
        switch (name) {

        }
    }

    handlerSubmitBtn() {
        var data = {
            name: this.state.name,
            description: this.state.description,
            actualPrice: this.state.price,
            duration: this.state.duration,
            available: true
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
                    <InputLabelForm label="Name"
                                    placeholder={this.state.name}
                                    type="text"
                                    onChange={this.handlerOnChange.bind(this, "name")}/>

                    <InputLabelForm label="Description"
                                    placeholder={this.state.description}
                                    type="text"
                                    onChange={this.handlerOnChange.bind(this, "desc")}/>

                    <InputLabelForm label="Price"
                                    placeholder={this.state.price}
                                    type="text"
                                    onChange={this.handlerOnChange.bind(this, "price")}/>

                    <InputLabelForm label="Duration (min)"
                                    placeholder={this.state.duration}
                                    type="text"
                                    onChange={this.handlerOnChange.bind(this, "duration")}/>
                </form>

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.props.Cancel}
                             pending={this.props.pending}/>
            </div>
        );
    }
}