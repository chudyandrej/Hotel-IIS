import React from 'react';


let header = {};


class TableHeader extends React.Component {
    render() {
        let columns = [];
        for (let key in this.props.Headers) {
            if (!this.props.Headers.hasOwnProperty(key)){
                continue;
            }
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
            remove: false,
            hover: false
        };

        for (let column in header) {
            this.state.columns.push(
                <td key={this.state.columns.length}>
                    {this.props.Row[column]}
                </td>
            );
        }
    }

    hoverAction() {
        //hover trigger for action buttons on the row
        this.setState({hover: true});
    }

    leaveAction() {
        //mouse leave trigger for action buttons on the row
        this.setState({hover: false});
    }

    handlerClick(data) {
        if (!this.state.hover) {
            this.props.showDetails(data);
        }
    }

    handlerEditBtn(data) {
        this.props.onEdit(data);
    }

    handlerRemove(data) {
        this.setState({remove: true});
        this.props.onRemove(data.id);
    }

    render() {

        let removeBtn = (
            <td className='btn-toolbar pull-right'
                onMouseEnter={this.hoverAction.bind(this)}
                onMouseLeave={this.leaveAction.bind(this)}>
                <button type="button"
                        className="btn btn-danger btn-sm"
                        onClick={this.handlerRemove.bind(this, this.props.Row)}>Remove
                </button>
            </td>
        );

        let buttons = (
            <div>
                <button type="button"
                        className="btn btn-info btn-sm"
                        onClick={this.handlerEditBtn.bind(this, this.props.Row)}>
                    Edit
                </button>
                <button type="button"
                        className="btn btn-info btn-sm"
                        onClick={this.handlerEditBtn.bind(this, this.props.Row)}>
                    Order
                </button>
            </div>
        );

        let actionBtns = (
            <td style={{color: "transparent"}}
                onMouseEnter={this.hoverAction.bind(this)}
                onMouseLeave={this.leaveAction.bind(this)}
                className='btn-toolbar pull-right'>

                {this.state.hover ? buttons : <div style={{width: 100, height: 30}}></div>}
            </td>
        );

        let Row = (
            <tr onClick={this.handlerClick.bind(this, this.props.Row)} style={{cursor: "pointer"}}>
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
        let rows = [];

        let tableStyle = {
            clear: "both"
        };

        this.props.TableData.slice(1,).forEach(function (row) {
            rows.push(<TableRow key={row.id}
                                Row={row}
                                onEdit={this.props.onEdit}
                                showDetails={this.props.showDetails}
                                onRemove={this.props.onRemove}
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