import React from 'react';

import Table from '../Components/Table.jsx';
import ServiceForm from '../Components/ServiceForm.jsx';
import FormButtons from '../Components/FormButtons.jsx';
import RightBtnToolbar from '../Components/RightBtnToolbar.jsx';

export default class Services extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            available: "active",
            unavailable: "default",
            all: "default",
            subHeader: "Services",
            showTable: true,
            showAddForm: false
        };
        this.handlerAvailableBtn = this.handlerAvailableBtn.bind(this);
        this.handlerUnAvailableBtn = this.handlerUnAvailableBtn.bind(this);
        this.handlerAllBtn = this.handlerAllBtn.bind(this);
        this.handlerAddBtn = this.handlerAddBtn.bind(this);
        this.handlerEditBtn = this.handlerEditBtn.bind(this);
        this.handlerSubmitBtn = this.handlerSubmitBtn.bind(this);
        this.handlerCancelBtn = this.handlerCancelBtn.bind(this);
    }

    handlerAvailableBtn() {
        this.setState({
            available: "active",
            unavailable: "default",
            all: "default"
        });
    }

    handlerUnAvailableBtn() {
        this.setState({
            available: "default",
            unavailable: "active",
            all: "default"
        });
    }

    handlerAllBtn() {
        this.setState({
            available: "default",
            unavailable: "default",
            all: "active"
        });
    }

    handlerAddBtn() {
        this.setState({
            showTable: false,
            showAddForm: true,
            subHeader: "Add new service"
        })
    }

    handlerEditBtn() {

    }

    handlerCancelBtn() {
        this.setState({
            showTable: true,
            showAddForm: false,
            subHeader: "Services"
        })
    }

    handlerSubmitBtn() {
        //TODO send form to backend
    }

    render() {
        var clsBtn = "btn btn-info ";

        var FAKEservicesDATA = [
            {name: "Name", desc: "Description", price: "Price"},
            {name: "service1", desc: "desc", price: 400},
            {name: "service2", desc: "desc", price: 400},
            {name: "service3", desc: "desc", price: 400}
        ];

        var Form = (
            <div>
                <ServiceForm />
                <FormButtons Submit={this.handlerSubmitBtn} Cancel={this.handlerCancelBtn}/>
            </div>
        );

        var LeftBtnToolbar = (
            <div className='btn-toolbar pull-left'>
                <button type="button"
                        className={clsBtn + this.state.available}
                        onClick={this.handlerAvailableBtn}>
                    Available
                </button>
                <button type="button"
                        className={clsBtn + this.state.unavailable}
                        onClick={this.handlerUnAvailableBtn}>
                    Unavailable
                </button>
                <button type="button"
                        className={clsBtn + this.state.all}
                        onClick={this.handlerAllBtn}>
                    All
                </button>
            </div>
        );

        return (
            <div>
                <h1 className="page-header">{this.state.subHeader}</h1>

                {this.state.showTable ? LeftBtnToolbar : null}

                <RightBtnToolbar Add={this.handlerAddBtn} Edit={this.handlerEditBtn}/>

                {this.state.showTable ?
                    <Table TableData={FAKEservicesDATA}/> : Form}

            </div>
        );
    }
}