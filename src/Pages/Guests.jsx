import React from 'react';

import Table from '../Components/Table.jsx';
import GuestForm from '../Components/Forms/GuestForm.jsx'
import RightBtnToolbar from '../Components/RightBtnToolbar.jsx';


export default class Guests extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            current: "active",
            all: "default",
            subHeader: "Active guests",
            showTable: true,
            showAddForm: false,
            removeAction: false,
            addBtnClicked: false
        };
    }

    handlerCurrentBtn() {
        this.setState({
            current: "active",
            all: "default",
            subHeader: "Current guests"
        });
    }


    handlerAllBtn() {
        this.setState({
            current: "default",
            all: "active",
            subHeader: "All guests"
        });
    }

    handlerAddBtn() {
        this.setState({
            showTable: false,
            showAddForm: true,
            subHeader: "Add a new guest",
            addBtnClicked: true,
            removeAction: false
        })
    }

    handlerRemoveBtn() {
        this.setState({removeAction: !this.state.removeAction});
    }

    handlerCancelBtn() {
        this.setState({
            showTable: true,
            showAddForm: false,
            subHeader: "Guests",
            addBtnClicked: false
        })
    }

    handlerSubmitBtn(data) {
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
                <GuestForm Submit={this.handlerSubmitBtn.bind(this)}
                           Cancel={this.handlerCancelBtn.bind(this)}/>
            </div>
        );

        var LeftBtnToolbar = (
            <div className='btn-toolbar pull-left'>
                <button type="button"
                        className={clsBtn + this.state.current}
                        onClick={this.handlerCurrentBtn.bind(this)}>
                    Current
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
                    <Table onRemove={this.handlerRemoveBtn}
                           TableData={FAKEservicesDATA}
                           RemoveAction={this.state.removeAction} /> : Form}
            </div>
        );
    }
}