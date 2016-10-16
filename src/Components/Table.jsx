import React from 'react';


class TableHeader extends  React.Component {
    render() {
        var columns = [];
        for (var key in this.props.Headers){
            columns.push(
                <th key={columns.length}>{this.props.Headers[key]}</th>
            )
        }

        return (
            <thead>
            <tr>
                {columns}
            </tr>
            </thead>
        )
    }
}


class TableRow extends  React.Component {
    render() {
        var columns = [];
        for (var column in this.props.Row){
            columns.push(
                <td key={columns.length}>
                    {this.props.Row[column]}
                </td>
            )
        }

        return (
            <tr>
                {columns}
            </tr>
        );
    }
}


export default class Table extends React.Component {
    render() {
        var rows = [];
        //TODO remove this style to css?
        var tableStyle = {
            clear: "both"
        };

        this.props.TableData.splice(1,).forEach(function(row) {
            rows.push(<TableRow key={rows.length} Row={row} />);
        }.bind(this));

        return (
            <div className="table-responsive" style={tableStyle}>
                <table className="table table-striped">
                    <TableHeader Headers={this.props.TableData[0]}/>
                    <tbody>

                    {rows}

                    </tbody>
                </table>
            </div>
        );
    }
}