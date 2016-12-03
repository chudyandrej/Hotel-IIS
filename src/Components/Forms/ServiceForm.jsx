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
                price: this.props.editData.actual_price,
                duration: this.props.editData.duration,

                nameRequired: null,
                priceRequired: null
            };
        }
    }

    handlerOnChange(name, evt) {
        let state = {};
        state[name] = evt.target.value;
        this.setState(state);
    }

    checkValidity(name) {
        let state = {};
        if (this.state[name] == "") {
            state[name + "Required"] = "has-error";
        }
        if (this.state[name] != "" && this.state[name + "Required"] != null) {
            state[name + "Required"] = null;
        }
        this.setState(state);
    }

    handlerSubmitBtn() {
        let data = {available: true};
        this.state.name != "" ? data['name'] = this.state.name : null;
        this.state.description != "" ? data['description'] = this.state.description : null;
        this.state.price != "" ? data['actual_price'] = this.state.price : null;
        data['duration'] = this.state.duration != "" ? 0 : this.state.duration;

        this.props.Submit(data);
    }

    render() {
        let tableStyle = {
            clear: "both"
        };

        let required = "This field is required!";

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
                                    onChange={this.handlerOnChange.bind(this, "description")}/>

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
                                    onChange={this.handlerOnChange.bind(this, "duration")}/>
                </form>

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.props.Cancel}
                             errorMsg={this.props.errorMsg}
                             pending={this.props.pending}/>
            </div>
        );
    }
}