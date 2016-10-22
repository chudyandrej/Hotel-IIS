import React from 'react';

import Table from '../Components/Table.jsx';
import RightBtnToolbar from '../Components/RightBtnToolbar.jsx';


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
    }

    handlerAvailableBtn() {
        this.setState({
            available: "active",
            unavailable: "default",
            all: "default",
            history: "default",
            subHeader: "Available rooms"
        });
    }

    handlerUnAvailableBtn() {
        this.setState({
            available: "default",
            unavailable: "active",
            all: "default",
            history: "default",
            subHeader: "Unavailable rooms"
        });
    }

    handlerAllBtn() {
        this.setState({
            available: "default",
            unavailable: "default",
            all: "active",
            history: "default",
            subHeader: "All services"
        });
    }

    handlerAddBtn() {

    }

    handlerRemoveBtn() {

    }

    render() {
        var clsBtn = "btn btn-info ";

        var FAKEservicesDATA = [
            {name: "Name", desc: "Description", price: "Price"},
            {name: "service1", desc: "desc", price: 400},
            {name: "service2", desc: "desc", price: 400},
            {name: "service3", desc: "desc", price: 400}
        ];


        return (
            <div>
                <h1 className="page-header">{this.state.subHeader}</h1>

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

                <RightBtnToolbar Add={this.handlerAddBtn.bind(this)}
                                 AddState={false}
                                 Remove={this.handlerRemoveBtn.bind(this)}/>

                <Table TableData={FAKEservicesDATA}/>
            </div>
        );
    }
}