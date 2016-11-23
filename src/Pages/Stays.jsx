import React from 'react';
import moment from 'moment';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
import BookRoomForm from '../Components/Forms/BookRoomForm.jsx';
import CalendarInput from '../Components/CalendarInput.jsx';
import DetailsTable from '../Components/DetailsTable.jsx';
import Loading from '../Components/Loading.jsx';
import RightBtnToolbar from '../Components/Buttons/RightBtnToolbar.jsx';
import Table from '../Components/Table.jsx';

import {sendRequest} from '../Functions/HTTP-requests.js';
import {parseData} from '../Functions/dataParsing.js';


export default class Stays extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            available: "active",
            all: "default",
            subHeader: "Current Stays",

            tableHeaders: [{
                last_name: "Last Name", status: "Status", from: "From", to: "To", id: "Room"
            }],
            stay: {
                status: "Status:", from: "From:", to: "To:", note: "Note:"
            },
            rooms: {
                id: "Room:", price_room: "Price:" //TODO more info about room
            },
            guest: {
                first_name: "First Name:", middle_name: "Middle Name:", last_name: "Last Name:",
                idcard_number: "Card Number:", email: "Email:", phone_number: "Phone number:",
                name_company: "Company Name:", ico: "ICO:", dic: "DIC:",
                address: "Address:", city: "City:", state: "State:"
            },
            employee: {
                first_name: "First Name:", middle_name: "Middle Name:", last_name: "Family name:",
                permissions: "Permissions:", password: "Password:", email: "Email:", phone_number: "Phone number:",
                iban: "IBAN:", address: "Address:", city: "City:", state: "State:"
            },

            showTable: true,
            showAddForm: false,
            showDetails: false,
            removeAction: false,
            addBtnClicked: false,

            startDate: moment(),
            endDate: moment().add(1, "day"),
            filter: "all",

            editData: null,
            tableData: [],
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
        let toSend = {
            from: this.state.startDate.format('YYYY-MM-DD'),
            to: this.state.endDate.format('YYYY-MM-DD')
        };
        sendRequest('https://young-cliffs-79659.herokuapp.com/getStays', toSend).then((data)=> {
            data = JSON.parse(data.text);

            parseData(data, "all").then((tableData) => {
                data = this.state.tableHeaders.concat(data);
                tableData = this.state.tableHeaders.concat(tableData);
                this.setState({pending: false, data: data, tableData: tableData});
            });
        }, (err)=> {
            //TODO handle error
            console.log("error");
            console.log(err);
        });
    }

    handlerButtons(name) {
        switch (name) {
            case "available":
                this.setState({
                    subHeader: "Current Stays",
                    available: "active",
                    all: "default"
                });
                break;
            case "all":
                this.setState({
                    subHeader: "All Stays",
                    available: "default",
                    all: "active"
                });
                break;
            case "add":
                this.setState({
                    subHeader: "Add a new stay",
                    showTable: false,
                    showAddForm: true,
                    addBtnClicked: true,
                    removeAction: false
                });
                break;
            case "remove":
                this.setState({removeAction: !this.state.removeAction});
                break;
            case "back":
                this.setState({
                    subHeader: "Current Stays",
                    available: "active",
                    all: "default",
                    showTable: true,
                    showDetails: false
                });
                this.fetchData();
                break;
        }
    }

    handleDayChange(name, date) {
        switch (name) {
            case "start":
                this.setState({startDate: date});
                break;
            case "end":
                this.setState({endDate: date});
                break;
        }
        this.fetchData();
    }

    handleFilter(evt){
        let filter = evt.target.value;
        //parse data, show only stays with status value equal to filter
        parseData(this.state.data.slice(1,), filter).then((tableData) => {
            tableData = this.state.tableHeaders.concat(tableData);
            this.setState({pending: false, filter: filter, tableData: tableData});
        });
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

    handleShowDetails(data) {
        let stayDetails = null;

        this.state.data.forEach(function (stay) {
            if (stay.id == data.id) {
                stayDetails = stay;
            }
        });

        stayDetails['from'] = moment(stayDetails.from).format('YYYY-MM-DD');
        stayDetails['to'] = moment(stayDetails.to).format('YYYY-MM-DD');

        this.setState({
            subHeader: "Stay Details",
            showTable: false,
            showDetails: true,
            data: stayDetails
        });
    }

    handlerSubmitBtn(data) {
        this.setState({sending: true});
        let url = null;

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
        let clsBtn = "btn btn-info ";
        let content = null;

        if (this.state.showTable) {
            let LeftBtnToolbar = (
                <div className='btn-toolbar pull-left'>
                    <button type="button"
                            className={clsBtn + this.state.available}
                            onClick={this.handlerButtons.bind(this, "available")}>
                        Current
                    </button>
                    <button type="button"
                            className={clsBtn + this.state.all}
                            onClick={this.handlerButtons.bind(this, "all")}>
                        All
                    </button>
                </div>
            );

            content = (
                <div>
                    {LeftBtnToolbar}
                    <RightBtnToolbar Add={this.handlerButtons.bind(this, "add")}
                                     AddState={this.state.addBtnClicked}
                                     Remove={this.handlerButtons.bind(this, "remove")}/>

                    <CalendarInput startDate={this.state.startDate}
                                   endDate={this.state.endDate}
                                   onChangeStart={this.handleDayChange.bind(this, "start")}
                                   onChangeEnd={this.handleDayChange.bind(this, "end")}/>
                    <div>
                        Status:
                    <select value={this.state.filter}
                            onChange={this.handleFilter.bind(this)}>
                        <option value="all">all</option>
                        <option value="inProgress">inProgress</option>
                        <option value="reservation">reservation</option>
                        <option value="ended">ended</option>
                        <option value="canceled">canceled</option>
                    </select>
                    </div>

                    <Table TableData={this.state.tableData}
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
                    <BackBtn onClick={this.handlerButtons.bind(this, "back")}/>
                    <hr/>
                    <DetailsTable Headers={this.state.stay}
                                  DetailsData={this.state.data}/>
                    <h3 className="page-header">Room:</h3>
                    <DetailsTable Headers={this.state.rooms}
                                  DetailsData={this.state.data.rooms}/>
                    <h3 className="page-header">Guest:</h3>
                    <DetailsTable Headers={this.state.guest}
                                  DetailsData={this.state.data.guest}/>
                    <h3 className="page-header">Employee:</h3>
                    <DetailsTable Headers={this.state.employee}
                                  DetailsData={this.state.data.employee}/>
                </div>
            )
        }
        else if (this.state.showAddForm){
            content = (
                <div>
                    <BookRoomForm Cancel={this.handlerButtons.bind(this, "back")}
                                  Submit={this.handlerSubmitBtn.bind(this)}
                                  pending={this.state.sending}/>
                </div>
            )
        }
        else {  //edit form
            content = (
                <div>
                    <BackBtn onClick={this.handlerButtons.bind(this, "back")}/>
                    ahoj
                </div>
            )
        }

        return (
            <div>
                <h1 className="page-header">{this.state.subHeader}</h1>


                {this.state.pending ? <Loading /> : content}
            </div>
        );
    }
}
