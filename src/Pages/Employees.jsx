import React from 'react';

import Table from '../Components/Table.jsx';
import Form from '../Components/Form.jsx';



export default class Employees extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showTable:true,
            showAddForm: false
        };

        this.handlerAddBtn = this.handlerAddBtn.bind(this);
        this.handlerEditBtn = this.handlerEditBtn.bind(this);
        this.handlerCancelBtn = this.handlerCancelBtn.bind(this);
    }

    handlerAddBtn() {
        this.setState({
            showTable: false,
            showAddForm: true
        })
    }

    handlerEditBtn() {

    }

    handlerCancelBtn() {
        this.setState({
            showTable:true,
            showAddForm: false
        })
    }

    render() {
        var clsBtn = "btn btn-info";

        var FAKEservicesDATA =[
            {name: "Name", desc: "Description", price: "Price"},
            {name: "service1", desc: "desc", price: 400},
            {name: "service2", desc: "desc", price: 400},
            {name: "service3", desc: "desc", price: 400}
        ];

        return (
            <div>
                <h1 className="page-header">Employees</h1>

                <div className='btn-toolbar pull-right'>
                    <button type="button"
                            className={clsBtn}
                            onClick={this.handlerAddBtn}>
                        Add
                    </button>

                    <button type="button"
                            className={clsBtn}
                            onClick={this.handlerEditBtn}>
                        Edit
                    </button>
                </div>
                {this.state.showTable ?
                    <Table TableData={FAKEservicesDATA}/> : <Form CancelBtn={this.handlerCancelBtn}/> }
            </div>
        );
    }
}