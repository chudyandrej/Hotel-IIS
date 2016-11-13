import React from 'react';
import moment from 'moment';

//TODO import of datepicker css file here instead of index.html
//import '../../node_modules/react-datepicker/dist/react-datepicker.css';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
import CalendarInput from '../Components/CalendarInput.jsx';
import DetailsTable from '../Components/DetailsTable.jsx';
import Table from '../Components/Table.jsx';


export default class Rooms extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            available: "active",
            unavailable: "default",
            all: "default",
            history: "default",
            subHeader: "Available Rooms",
            showTable: true,

            startDate: moment(),
            endDate: moment(),
            details: null
        };
    }

    handlerAvailableBtn() {
        this.setState({
            available: "active",
            unavailable: "default",
            all: "default",
            history: "default",
            subHeader: "Available Rooms"
        });
    }

    handlerUnAvailableBtn() {
        this.setState({
            available: "default",
            unavailable: "active",
            all: "default",
            history: "default",
            subHeader: "Unavailable Rooms"
        });
    }

    handlerAllBtn() {
        this.setState({
            available: "default",
            unavailable: "default",
            all: "active",
            history: "default",
            subHeader: "All Rooms"
        });
    }

    handleDayChange(name, date) {
        switch (name) {
            case "start":
                this.setState({startDate: date});
                break;
            case "end":
                this.setState({endDate: date});
                //TODO call backend to get free rooms in the specified time
                break;
        }
    }

    handleShowDetails(data) {
        this.setState({
            showTable: false,
            details: data
        })
    }

    handlerBackBtn() {
        this.setState({
            showTable: true
        })
    }

    render() {
        var clsBtn = "btn btn-info ";
        var mainContent = null;

        var FAKEservicesDATA = [
            {name: "Name", desc: "Description", price: "Price"},
            {name: "service1", desc: "desc", price: 400},
            {name: "service2", desc: "desc", price: 400},
            {name: "service3", desc: "desc", price: 400}
        ];

        if (this.state.showTable) {
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

            mainContent = (
                <div>
                    {LeftBtnToolbar}
                    <CalendarInput startDate={this.state.startDate}
                                   endDate={this.state.endDate}
                                   onChangeStart={this.handleDayChange.bind(this, "start")}
                                   onChangeEnd={this.handleDayChange.bind(this, "end")}/>

                    <Table TableData={FAKEservicesDATA}
                           showDetails={this.handleShowDetails.bind(this)}/>
                </div>
            )
        }
        else {
            mainContent = (
                <DetailsTable Headers={FAKEservicesDATA[0]}
                              DetailsData={this.state.details}/>
            );
        }

        return (
            <div>
                <h1 className="page-header">{this.state.subHeader}</h1>

                {this.state.showTable ? null : <BackBtn onClick={this.handlerBackBtn.bind(this)}/>}

                {mainContent}
            </div>
        );
    }
}