import React from 'react';

import FormButtons from '../Buttons/FormButtons.jsx';
import InputLabelForm from './InputLabelForm.jsx';
import StayType from './StayType.jsx';


export default class Services extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            status: this.props.status,
            note: this.props.note
        }
    }

    handleChange(name, evt) {
        switch (name) {
            case "status":
                this.setState({status: evt.target.value});
                break;
            case "note":
                this.setState({note: evt.target.value});
                break;
        }
    }

    handlerSubmitBtn() {
        let toEdit = {status: this.state.status};
        if (this.state.note != null){
            toEdit['note'] = this.state.note;
        }
        this.props.Submit(toEdit);
    }

    render() {
        let tableStyle = {
            clear: "both",
            marginTop: 20
        };
        return (
            <div style={tableStyle}>
                <h1 className="page-header">Change Status</h1>
                {this.props.details}
                <br/>
                <h3>Status:</h3>
                <StayType type={this.state.status} onChange={this.handleChange.bind(this, "status")}/>
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