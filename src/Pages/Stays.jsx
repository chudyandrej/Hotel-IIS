import React from 'react';
import moment from 'moment';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
import CalendarInput from '../Components/CalendarInput.jsx';
import DetailsTable from '../Components/DetailsTable.jsx';
import Loading from '../Components/Loading.jsx';
import RightBtnToolbar from '../Components/Buttons/RightBtnToolbar.jsx';
import Table from '../Components/Table.jsx';

import {sendRequest} from '../Functions/HTTP-requests.js';


export default class Stays extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            available: "active",
            all: "default",
            subHeader: "Current Stays",

            tableHeaders: [{name: "Name", actualPrice: "Price", duration: "Duration"}],
            detailsHeaders: {
                name: "Name:", actualPrice: "Price:", description: "Description:",
                duration: "Duration:"
            },

            showTable: true,
            showAddForm: false,
            showDetails: false,
            removeAction: false,
            addBtnClicked: false,

            startDate: moment(),
            endDate: moment(),

            editData: null,
            data: [],
            pending: true,
            sending: false
        };
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({pending: true});
        //TODO add default time to show stays in that specified time
        sendRequest('https://young-cliffs-79659.herokuapp.com/getStays', {}).then((data)=> {
            data = this.state.tableHeaders.concat(JSON.parse(data.text));
            this.setState({pending: false, data: data});
        }, (err)=> {
            //TODO handle error
        });
    }

    handlerAvailableBtn() {
        this.setState({
            available: "active",
            all: "default",
            subHeader: "Current Stays"
        });
    }

    handlerAllBtn() {
        this.setState({
            available: "default",
            all: "active",
            subHeader: "All Stays"
        });
    }

    handleDayChange(name, date) {
        switch (name) {
            case "start":
                this.setState({startDate: date});
                break;
            case "end":
                this.setState({endDate: date});
                //TODO call backend to get stays in the specified time
                //   - based on which selection is on (current/all)
                break;
        }
    }

    handlerEditBtn(data) {
        // data = data are sent by the row, which a user wants to edit
        this.setState({
            subHeader: "Edit the stay",
            showTable: false,
            showAddForm: false,
            addBtnClicked: false,
            removeAction: false,

            editData: data
        });
    }

    handlerAddBtn() {
        this.setState({
            subHeader: "Add a new stay",
            showTable: false,
            showAddForm: true,
            addBtnClicked: true,
            removeAction: false
        });
    }

    handlerRemoveBtn() {
        this.setState({removeAction: !this.state.removeAction});
    }

    handleShowDetails(data) {
        this.setState({
            showTable: false,
            showDetails: true,
            data: data
        })
    }

    handlerBackBtn() {
        this.setState({
            showTable: true,
            showDetails: false
        });
        this.fetchData();
    }

    handlerSubmitBtn(data) {
        this.setState({sending: true});
        var url = null;

        if (this.state.editData == null) {  //add a new stay
            url = 'https://young-cliffs-79659.herokuapp.com/addNewStay';
        }
        else {  //edit the stay
            url = 'https://young-cliffs-79659.herokuapp.com/editStay';
            data['id'] = this.state.editData.id;
        }

        sendRequest(url, data)
            .then(()=> {
                console.log("data sent successfully");
                this.setState({sending: false});
                this.handlerCancelBtn();
            }, (err)=> {
                //TODO handle error
            });
    }

    render() {
        var clsBtn = "btn btn-info ";
        var content = null;

        if (this.state.showTable) {
            var LeftBtnToolbar = (
                <div className='btn-toolbar pull-left'>
                    <button type="button"
                            className={clsBtn + this.state.available}
                            onClick={this.handlerAvailableBtn.bind(this)}>
                        Current
                    </button>
                    <button type="button"
                            className={clsBtn + this.state.all}
                            onClick={this.handlerAllBtn.bind(this)}>
                        All
                    </button>
                </div>
            );

            content = (
                <div>
                    {LeftBtnToolbar}
                    <CalendarInput startDate={this.state.startDate}
                                   endDate={this.state.endDate}
                                   onChangeStart={this.handleDayChange.bind(this, "start")}
                                   onChangeEnd={this.handleDayChange.bind(this, "end")}/>
                    <Table TableData={this.state.data}
                           onEdit={this.handlerEditBtn.bind(this)}
                        //onRemove={this.handlerRemove.bind(this)}
                           showDetails={this.handleShowDetails.bind(this)}
                           RemoveAction={this.state.removeAction}/>
                </div>
            )
        }
        else if (this.state.showDetails) {
            content = (
                <div>
                    <BackBtn onClick={this.handlerBackBtn.bind(this)}/>
                    <DetailsTable Headers={this.state.detailsHeaders}
                                  DetailsData={this.state.data}/>
                </div>
            )
        }
        else {
            content = (
                <div></div>
            )
        }

        return (
            <div>
                <h1 className="page-header">{this.state.subHeader}</h1>

                {this.state.showDetails ? null : <RightBtnToolbar Add={this.handlerAddBtn.bind(this)}
                                                                  AddState={this.state.addBtnClicked}
                                                                  Remove={this.handlerRemoveBtn.bind(this)}/>}

                {this.state.pending ? <Loading /> : content}
            </div>
        );
    }
}
