import React from 'react';

import Table from '../Components/Table.jsx';


export default class Rooms extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            available: "active",
            unavailable: "default",
            all: "default",
            history: "default",
            subHeader: "Available Rooms"
        };
        this.handlerAvailableBtn = this.handlerAvailableBtn.bind(this);
        this.handlerUnAvailableBtn = this.handlerUnAvailableBtn.bind(this);
        this.handlerAllBtn = this.handlerAllBtn.bind(this);
        this.handlerAddBtn = this.handlerAddBtn.bind(this);
        this.handlerEditBtn = this.handlerEditBtn.bind(this);
    }

    handlerAvailableBtn() {
        this.setState ({
            available: "active",
            unavailable: "default",
            all: "default",
            history: "default",
            subHeader: "Available rooms"
        });
    }

    handlerUnAvailableBtn() {
        this.setState ({
            available: "default",
            unavailable: "active",
            all: "default",
            history: "default",
            subHeader: "Unavailable rooms"
        });
    }

    handlerAllBtn() {
        this.setState ({
            available: "default",
            unavailable: "default",
            all: "active",
            history: "default",
            subHeader: "All services"
        });
    }

    handlerAddBtn() {

    }

    handlerEditBtn() {

    }

    render() {
        var clsBtn = "btn btn-info ";

        var FAKEservicesDATA =[
            {name: "Name", desc: "Description", price: "Price"},
            {name: "service1", desc: "desc", price: 400},
            {name: "service2", desc: "desc", price: 400},
            {name: "service3", desc: "desc", price: 400}
        ];


        return (
            <div>
                <h1 className="page-header">Rooms</h1>

                <h2 className="sub-header">{this.state.subHeader}</h2>

                <div className='btn-toolbar pull-left'>
                    <button type="button"
                            className={clsBtn + this.state.available}
                            onClick={this.handlerAvailableBtn}>
                        Available
                    </button>
                    <button type="button"
                            className={clsBtn + this.state.available}
                            onClick={this.handlerUnAvailableBtn}>
                        Unavailable
                    </button>
                    <button type="button"
                            className={clsBtn + this.state.available}
                            onClick={this.handlerAllBtn}>
                        All
                    </button>
                </div>

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

                <Table TableData={FAKEservicesDATA}/>
            </div>
        );
    }
}