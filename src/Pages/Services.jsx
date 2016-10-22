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
            subHeader: "Available Services",
            showTable: true,
            showAddForm: false,
            items: null,
            removeAction: false,
            addBtnClicked: false,

            name: null,
            description: null,
            price: null
        };
        this.handlerAvailableBtn = this.handlerAvailableBtn.bind(this);
        this.handlerUnAvailableBtn = this.handlerUnAvailableBtn.bind(this);
        this.handlerAllBtn = this.handlerAllBtn.bind(this);
        this.handlerAddBtn = this.handlerAddBtn.bind(this);
        this.handlerRemoveBtn = this.handlerRemoveBtn.bind(this);
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

    handlerAddBtn() {
        this.setState({
            showTable: false,
            showAddForm: true,
            subHeader: "Add a new service",
            addBtnClicked: true
        })
    }

    handlerRemoveBtn() {
        //ev.preventDefault();
        console.log("here in Services");
        //console.log(item.name);
        this.setState({removeAction: !this.state.removeAction});
        //var items =  this.state.items.filter(function(itm){
        //    return item.id !== itm.id;
        //});
        //this.setState({items: items});
    }

    handlerOnChange(name, evt){
        console.log(name);
        switch (name){
            case "name":
                this.setState({name: evt.target.value}); break;
            case "desc":
                this.setState({description: evt.target.value}); break;
            case "price":
                this.setState({price: evt.target.value}); break;
        }
    }

    handlerCancelBtn() {
        this.setState({
            showTable: true,
            showAddForm: false,
            subHeader: "Services",
            addBtnClicked: false
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
                <ServiceForm onChange={this.handlerOnChange}/>
                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.handlerCancelBtn.bind(this)}
                             onChange={this.handlerOnChange}/>
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

                <RightBtnToolbar Add={this.handlerAddBtn}
                                 AddState={this.state.addBtnClicked}
                                 Remove={this.handlerRemoveBtn}/>

                {this.state.showTable ?
                    <Table onRemove={this.handlerRemoveBtn}
                           TableData={FAKEservicesDATA}
                           RemoveAction={this.state.removeAction} /> : Form}

            </div>
        );
    }
}