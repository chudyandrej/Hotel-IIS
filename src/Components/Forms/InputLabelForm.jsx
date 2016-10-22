import React from 'react';


export default class InputLabelForm extends React.Component {
    render() {
        return (
            <div className="form-group row">
                <label className="col-xs-2 col-form-label">{this.props.label}:</label>
                <div className="col-xs-6">
                    <input
                        className="form-control"
                        type={this.props.type}
                        placeholder={this.props.label}
                        onChange={this.props.onChange}/>
                    {this.props.help}
                </div>
            </div>
        )
    }
}