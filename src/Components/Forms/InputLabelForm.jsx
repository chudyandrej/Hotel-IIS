import React from 'react';


export default class InputLabelForm extends React.Component {
    render() {

        let valid = this.props.validity || "";
        let help = null;
        let required = null;
        let errorMsg = null;

        if (this.props.help != null) {
            help = <small className="form-text text-muted">{this.props.help}</small>;
        }

        if (this.props.required != null) {
            required = <small className="form-text text-muted" style={{color: "red"}}>*</small>;
        }

        if (this.props.errorMsg != null) {
            errorMsg = <strong className="form-text alert alert-danger">{this.props.errorMsg}</strong>;
        }

        return (
            <div className={"form-group row " + valid}>
                <label className="col-xs-2 col-form-label">{this.props.label}:</label>
                {required}
                <div className="col-xs-6">
                    <input
                        className="form-control"
                        type={this.props.type}
                        placeholder={this.props.placeholder || this.props.label}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}/>
                        {help}
                </div>
                {errorMsg}
            </div>
        )
    }
}