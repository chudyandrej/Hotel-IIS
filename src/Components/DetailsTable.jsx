import React from 'react';


export default class DetailsTable extends React.Component {
    render(){

        var tableStyle = {
            clear: "both",
            marginTop: 20
        };

        var rows = [];

        for (var column in this.props.DetailsData){
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