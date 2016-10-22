import React from 'react';


var header = {};


class TableHeader extends React.Component {
    render() {
        var columns = [];
        for (var key in this.props.Headers) {
            columns.push(
                <th className="col-xs-4" key={columns.length}>{this.props.Headers[key]}</th>
            )
        }

        columns.push(<th className="col-xs-3" style={{color: "transparent"}} key={columns.length}>X</th>);

        return (
            <thead>
            <tr>
                {columns}
            </tr>
            </thead>
        )
    }
}


class TableRow extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            columns: [],
            table: [],
            remove: false,
            hover: false
        };

        for (var column in this.props.Row) {
            this.state.columns.push(
                <td key={this.state.columns.length}>
                    {this.props.Row[column]}
                </td>
            );
            this.state.table.push(
                <tr key={this.state.table.length}>
                    <td key={0} style={{fontWeight: "bold"}}>{header[column]}</td>
                    <td key={1}>{this.props.Row[column]}</td>
                </tr>
            )
        }
    }

    hoverAction() {
        this.setState({hover: true});
        console.log("enter " + this.state.hover);
    }

    leaveAction() {
        this.setState({hover: false});
        console.log("leave " + this.state.hover);
    }

    handlerClick(data) {
        //TODO show details
        console.log(data.name);
    }

    handlerEditBtn(data) {
        this.props.onEdit(data);
    }

    handlerRemove(data) {
        //TODO send request to delete item
        this.setState({remove: true});
    }

    render() {

        var removeBtn = (
            <td className='btn-toolbar pull-right'>
                <button type="button"
                        className="btn btn-danger btn-sm"
                        onClick={this.handlerRemove.bind(this, this.props.Row)}>Remove
                </button>
            </td>
        );

        var actionBtns = (
            <td style={{color: "transparent"}}
                onMouseEnter={this.hoverAction.bind(this)}
                onMouseLeave={this.leaveAction.bind(this)}
                className='btn-toolbar pull-right'>

                {this.state.hover ? <button type="button"
                                            className="btn btn-info btn-sm"
                                            onClick={this.handlerEditBtn.bind(this, this.props.Row)}>
                    Edit
                </button> : <div style={{width: 88, height: 30}}></div>}
            </td>
        );

        var Row = (
            <tr onClick={this.handlerClick.bind(this, this.props.Row)}>
                {this.state.columns}
                {this.props.RemoveAction ? removeBtn : actionBtns}
            </tr>
        );

        //do not render the Row, make it disappear
        if (this.state.remove) {
            Row = null;
        }

        return (
            Row
        );
    }
}


export default class Table extends React.Component {
    render() {

        header = this.props.TableData[0];
        var rows = [];

        //TODO move this style to css?
        var tableStyle = {
            clear: "both"
        };

        this.props.TableData.splice(1,).forEach(function (row) {
            rows.push(<TableRow key={row.name}
                                Row={row}
                                onEdit={this.props.onEdit}
                                RemoveAction={this.props.RemoveAction}/>);
        }.bind(this));

        return (
            <div className="table-responsive" style={tableStyle}>
                <table className="table table-striped table-hover">
                    <TableHeader Headers={header}/>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}