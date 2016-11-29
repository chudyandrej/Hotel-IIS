import React from 'react';
import ImageLoader from 'react-imageloader';


export default class DetailsTable extends React.Component {
    render() {

        let tableStyle = {
            clear: "both",
            marginTop: 20
        };

        let rows = [];
        let value = null;

        for (let column in this.props.Headers) {
            //skip null, empty or not own values
            if (!this.props.Headers.hasOwnProperty(column) ||
                this.props.DetailsData[column] == null ||
                this.props.DetailsData[column] === "") {
                continue;
            }
            // if details are boolean values, show pictures, instead the values
            if (typeof(this.props.DetailsData[column]) === "boolean") {
                if (this.props.DetailsData[column]) {
                    value = <ImageLoader src={require("../../../public/img/tick.png")} />;
                }
                else {
                    value = <ImageLoader src={require("../../../public/img/cross.png")} />;
                }
                rows.push (
                    <div key={rows.length} className={"form-group"}>
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
                    <div key={rows.length} className={"form-group"}>
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