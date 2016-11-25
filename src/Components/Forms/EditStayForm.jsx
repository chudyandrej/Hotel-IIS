import React from 'react';

import FormButtons from '../Buttons/FormButtons.jsx';
import InputLabelForm from './InputLabelForm.jsx';
import StayType from './StayType.jsx';


export default class Services extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            type: this.props.type,
            note: this.props.note
        }
    }

    handleChange(name, evt) {
        switch (name) {
            case "type":
                //TODO if type == ended => show price for the stay
                this.setState({type: evt.target.value});
                break;
            case "note":
                this.setState({note: evt.target.value});
                break;
        }
    }

    handlerSubmitBtn() {
        let toEdit = {status: this.state.type};
        if (this.state.note != null){
            toEdit['note'] = this.state.note;
        }
        console.log("submitting changes");
        console.log(toEdit);
        this.props.Submit(toEdit);
    }

    render() {
        let tableStyle = {
            clear: "both",
            marginTop: 20
        };
        //TODO show services ordered during the stay
        return (
            <div style={tableStyle}>
                <h1 className="page-header">Edit the Stay</h1>
                {this.props.details}

                <StayType type={this.state.type} onChange={this.handleChange.bind(this, "type")}/>
                <InputLabelForm label="Note"
                                type="text"
                                placeholder={this.state.note}
                                onChange={this.handleChange.bind(this, "note")}/>


                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.props.Cancel}
                             pending={this.props.pending}/>
            </div>
        )
    }
}