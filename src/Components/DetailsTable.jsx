import React from 'react';


export default class DetailsTable extends React.Component {
    render() {

        let tableStyle = {
            clear: "both",
            marginTop: 20
        };

        let rows = [];
        let value = null;

        for (let column in this.props.Headers) {
            if (!this.props.Headers.hasOwnProperty(column) || this.props.DetailsData[column] == null) {
                continue;
            }
            if (typeof(this.props.DetailsData[column]) === "boolean") {
                //TODO show images instead of text ???
                value = this.props.DetailsData[column] ? "YES" : "NO";
                rows.push (
                    <div key={rows.length} className={"form-group row"}>
                        <label className="col-xs-2 col-form-label">
                            {this.props.Headers[column]}
                        </label>
                        <p>
                            {value}
                        </p>
                    </div>
                );
            }
            else {
                rows.push (
                    <div key={rows.length} className={"form-group row"}>
                        <label className="col-xs-2 col-form-label">
                            {this.props.Headers[column]}
                        </label>
                        <p>
                            {this.props.DetailsData[column]}
                        </p>
                    </div>
                );
            }
        }

        return (
            <form style={tableStyle}>
                {rows}
            </form>
        )
    }
}