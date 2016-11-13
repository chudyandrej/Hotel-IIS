import React from 'react';

import InputLabelForm from './InputLabelForm.jsx';
import FormButtons from '../Buttons/FormButtons.jsx';


export default class ServiceForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        if (this.props.editData == null) {
            this.state = {
                name: "",
                description: "",
                price: "",
                duration: "",

                nameRequired: null,
                descriptionRequired: null,
                priceRequired: null,
                durationRequired: null
            };
        }
        else {
            this.state = {
                name: this.props.editData.name,
                description: this.props.editData.description,
                price: this.props.editData.actualPrice,
                duration: this.props.editData.duration,

                nameRequired: null,
                descriptionRequired: null,
                priceRequired: null,
                durationRequired: null
            };
        }
    }

    handlerOnChange(name, evt) {
        var state = {};
        state[name] = evt.target.value;
        this.setState(state);
    }

    checkValidity(name) {
        var state = {};
        if (this.state[name] == ""){
            state[name+"Required"] = "has-error";
        }
        if (this.state[name] != "" && this.state[name+"Required"] != null){
            state[name+"Required"] = null;
        }
        this.setState(state);
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

        var required = "This field is required!";

        return (
            <div>
                <form style={tableStyle}>
                    <InputLabelForm label="Name"
                                    placeholder={this.state.name}
                                    type="text"
                                    required={true}
                                    validity={this.state.nameRequired}
                                    onBlur={this.checkValidity.bind(this, "name")}
                                    onChange={this.handlerOnChange.bind(this, "name")}
                                    errorMsg={this.state.nameRequired == null ? null : required}/>

                    <InputLabelForm label="Description"
                                    placeholder={this.state.description}
                                    type="text"
                                    required={true}
                                    validity={this.state.descriptionRequired}
                                    onBlur={this.checkValidity.bind(this, "description")}
                                    onChange={this.handlerOnChange.bind(this, "description")}
                                    errorMsg={this.state.descriptionRequired == null ? null : required}/>

                    <InputLabelForm label="Price"
                                    placeholder={this.state.price}
                                    type="text"
                                    required={true}
                                    validity={this.state.priceRequired}
                                    onBlur={this.checkValidity.bind(this, "price")}
                                    onChange={this.handlerOnChange.bind(this, "price")}
                                    errorMsg={this.state.priceRequired == null ? null : required}/>

                    <InputLabelForm label="Duration (min)"
                                    placeholder={this.state.duration}
                                    type="text"
                                    required={true}
                                    validity={this.state.durationRequired}
                                    onBlur={this.checkValidity.bind(this, "duration")}
                                    onChange={this.handlerOnChange.bind(this, "duration")}
                                    errorMsg={this.state.durationRequired == null ? null : required}/>
                </form>

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.props.Cancel}
                             errorMsg={this.props.errorMsg}
                             pending={this.props.pending}/>
            </div>
        );
    }
}