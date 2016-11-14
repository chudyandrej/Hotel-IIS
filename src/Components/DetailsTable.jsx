import React from 'react';


export default class DetailsTable extends React.Component {
    render(){

        let tableStyle = {
            clear: "both",
            marginTop: 20
        };

        let rows = [];

        for (let column in this.props.Headers){
            if ( !this.props.Headers.hasOwnProperty(column) || this.props.DetailsData[column] == null) {
                continue;
            }
            rows.push(
                <div key={rows.length} className={"form-group row"}>
                    <label className="col-xs-2 col-form-label">
                        {this.props.Headers[column]}
                    </label>
                    <p>
                        {this.props.DetailsData[column]}
                    </p>
                </div>
            )
        }

        return (
            <form style={tableStyle}>
                {rows}
            </form>
        )
    }
}