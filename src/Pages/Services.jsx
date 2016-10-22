import React from 'react';

import Table from '../Components/Table.jsx';
import ServiceForm from '../Components/Forms/ServiceForm.jsx';
import RightBtnToolbar from '../Components/RightBtnToolbar.jsx';

export default class Services extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            available: "active",
            unavailable: "default",
            all: "default",
            subHeader: "Available Services",

            showTable: true,
            showAddForm: false,
            removeAction: false,
            addBtnClicked: false,

            editData: null
        };
    }

    handlerAvailableBtn() {
        this.setState({
            available: "active",
            unavailable: "default",
            all: "default",
            subHeader: "Available Services"
        });
    }

    handlerUnAvailableBtn() {
        this.setState({
            available: "default",
            unavailable: "active",
            all: "default",
            subHeader: "Unavailable Services"
        });
    }

    handlerAllBtn() {
        this.setState({
            available: "default",
            unavailable: "default",
            all: "active",
            subHeader: "All Services"
        });
    }

    handlerEditBtn(data) {
        // data = data which sends the row, which a user wants to edit
        this.setState({
            subHeader: "Edit the service",
            showTable: false,
            showAddForm: false,
            addBtnClicked: false,
            removeAction: false,

            editData: data
        });
    }

    handlerAddBtn() {
        this.setState({
            subHeader: "Add a new service",
            showTable: false,
            showAddForm: true,
            addBtnClicked: true,
            removeAction: false
        });
    }

    handlerRemoveBtn() {
        console.log("here in Services"); //DEBUG
        this.setState({removeAction: !this.state.removeAction});
    }

    handlerCancelBtn() {
        this.setState({
            subHeader: "Services",
            showTable: true,
            showAddForm: false,
            addBtnClicked: false
        });
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
                <ServiceForm Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.handlerCancelBtn.bind(this)}
                             editData={this.state.editData}/>
            </div>
        );

        var LeftBtnToolbar = (
            <div className='btn-toolbar pull-left'>
                <button type="button"
                        className={clsBtn + this.state.available}
                        onClick={this.handlerAvailableBtn.bind(this)}>
                    Available
                </button>
                <button type="button"
                        className={clsBtn + this.state.unavailable}
                        onClick={this.handlerUnAvailableBtn.bind(this)}>
                    Unavailable
                </button>
                <button type="button"
                        className={clsBtn + this.state.all}
                        onClick={this.handlerAllBtn.bind(this)}>
                    All
                </button>
            </div>
        );

        return (
            <div>
                <h1 className="page-header">{this.state.subHeader}</h1>

                {this.state.showTable ? LeftBtnToolbar : null}

                <RightBtnToolbar Add={this.handlerAddBtn.bind(this)}
                                 AddState={this.state.addBtnClicked}
                                 Remove={this.handlerRemoveBtn.bind(this)}/>

                {this.state.showTable ?
                    <Table TableData={FAKEservicesDATA}
                           onEdit={this.handlerEditBtn.bind(this)}
                           onRemove={this.handlerRemoveBtn}
                           RemoveAction={this.state.removeAction}/> : Form}
            </div>
        );
    }
}