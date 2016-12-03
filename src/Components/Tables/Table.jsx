import React from 'react';
import ImageLoader from 'react-imageloader';


let header = {};


export class TableHeader extends React.Component {
    render() {
        let columns = [];

        for (let key in this.props.Headers) {
            if (!this.props.Headers.hasOwnProperty(key)) {
                continue;
            }
            columns.push(
                <th className={typeof(this.props.Rooms) === "undefined" ? "col-md-3 text-center" : "col-md-1 text-center"}
                    key={columns.length}>
                    {this.props.Headers[key]}
                </th>
            )
        }

        columns.push(<th className="col-md-2" style={{color: "transparent"}} key={columns.length}>X</th>);

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
            hover: false,
            backgroundColor: "",
        };
        let value = null;

        for (let column in header) {
            if (typeof(this.props.Row[column]) === "boolean") {
                if (this.props.Row[column]) {
                    value = <ImageLoader src={require("../../../public/img/tick.png")}/>;
                }
                else {
                    value = <ImageLoader src={require("../../../public/img/cross.png")}/>;
                }
            }
            else {
                value = this.props.Row[column];
            }
            this.state.columns.push(
                <td key={this.state.columns.length} className="text-center">
                    {value}
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

    handlerOrderBtn(data) {
        this.props.order(data);
        if (this.state.backgroundColor === "") {
            this.setState({backgroundColor: "#C3F7D3"})
        }
        else {
            this.setState({backgroundColor: ""})
        }
    }

    handlerRemove(data) {
        this.setState({remove: true});
        this.props.onRemove(data.id);
    }

    render() {

        let removeBtn = (
            <button className="btn btn-info btn-sm"
                    onClick={this.handlerRemove.bind(this, this.props.Row)}>
                <ImageLoader src={require("../../../public/img/removeBtn.png")}/>
            </button>
        );

        let editBtn = (
            <button type="button"
                    className="btn btn-info btn-sm"
                    onClick={this.handlerEditBtn.bind(this, this.props.Row)}>
                <ImageLoader src={require("../../../public/img/editBtn.png")}/>
            </button>
        );

        let orderBtn = (
            <button type="button"
                    className="btn btn-info btn-sm"
                    onClick={this.handlerOrderBtn.bind(this, this.props.Row)}>
                {this.props.orderBtnName === "Remove" ?
                    <ImageLoader src={require("../../../public/img/removeBtn.png")}/> :
                    <ImageLoader src={require("../../../public/img/buyBtn.png")}/>}

            </button>
        );

        let buttons = (
            <div>
                {this.props.onEdit == null ? null : editBtn}
                {this.props.order == null ? null : orderBtn}
                {this.props.onRemove == null ? null : removeBtn}
            </div>
        );

        let actionBtns = (
            <td className='btn-toolbar'>
                <div style={{float: "right"}}
                     className='btn-toolbar'
                     onMouseEnter={this.hoverAction.bind(this)}
                     onMouseLeave={this.leaveAction.bind(this)}>
                    {buttons}
                </div>
            </td>
        );
        let style = {backgroundColor: this.state.backgroundColor};
        if (this.props.onEdit != null  || this.props.onRemove != null || this.props.showDetails != null) {
            style['cursor'] = "pointer";
        }

        let Row = (
            <tr onClick={this.props.showDetails == null ? null : this.handlerClick.bind(this, this.props.Row)}
                style={style}>
                {this.state.columns}
                {actionBtns}
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

        this.props.TableData.slice(1,).forEach((row) => {
            rows.push(<TableRow key={row.id}
                                Row={row}
                                onEdit={this.props.onEdit}
                                showDetails={this.props.showDetails}
                                order={this.props.order}
                                orderBtnName={this.props.orderBtnName}
                                onRemove={this.props.onRemove}
                                removeBtnName={this.props.removeBtnName}/>);
        });

        return (
            <div className="table-responsive" style={tableStyle}>
                <table className="table table-striped table-hover">
                    <TableHeader Headers={header} Rooms={this.props.Rooms}/>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}