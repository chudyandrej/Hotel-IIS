import React from 'react';


export default class StayType extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <div className="form-group row ">
                <label className="col-xs-2 col-form-label">Type of order:</label>
                <div className="col-xs-6">
                    <select value={this.props.status}
                            onChange={this.props.onChange}>
                        <option value="inProgress">inProgress</option>
                        <option value="reservation">reservation</option>
                        {this.props.createStay ? null : <option value="canceled">canceled</option>}
                        {this.props.createStay ? null : <option value="ended">ended</option>}
                    </select>
                </div>
            </div>
        )
    }
}