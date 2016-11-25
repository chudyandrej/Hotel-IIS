import React from 'react';
import moment from 'moment';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
import BookRoomForm from '../Components/Forms/BookRoomForm.jsx';
import CalendarInput from '../Components/CalendarInput.jsx';
import DetailsTable from '../Components/DetailsTable.jsx';
import Loading from '../Components/Loading.jsx';
import AddBtn from '../Components/Buttons/AddBtn.jsx';
import Table from '../Components/Table.jsx';

import {downloadData, sendRequest} from '../Functions/HTTP-requests.js';
import {parseStaysData} from '../Functions/dataParsing.js';


export default class Stays extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            available: "active",
            all: "default",
            availableBefore: true,
            subHeader: "Current Stays",
            isNotChild: typeof(this.props.isChild) === "undefined",
            tableHeaders: [{
                last_name: "Last Name", status: "Status", from: "From", to: "To", roomNumber: "Room"
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
                permissions: "Permissions:", email: "Email:", phone_number: "Phone number:"
            },

            showTable: true,
            showAddForm: false,
            showDetails: false,

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
        this.fetchData(true);
    }

    fetchData(current) {
        this.setState({pending: true});
        let toSend = null;
        if (current) {
             toSend = {
                from: this.state.startDate.format('YYYY-MM-DD'),
                to: this.state.endDate.format('YYYY-MM-DD')
            };
        }
        else {
            toSend = {
                from: moment("20140101", "YYYYMMDD"),
                to: moment("20200101", "YYYYMMDD")
            };
            this.setState({startDate: toSend.from, endDate: toSend.to});
        }

        downloadData('getStays', toSend).then((data) => {
            parseStaysData(data, "all").then((tableData) => {
                data = this.state.tableHeaders.concat(data);
                tableData = this.state.tableHeaders.concat(tableData);
                this.setState({pending: false, data: data, tableData: tableData});
            });
        }, (err) => {
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
                    all: "default",
                    availableBefore: true
                });
                this.setState({
                    startDate: moment(),
                    endDate: moment().add(1, "day")
                });
                this.fetchData(true);
                break;
            case "all":
                this.setState({
                    subHeader: "All Stays",
                    available: "default",
                    all: "active",
                    availableBefore: false
                });
                this.fetchData(false);
                break;
            case "add":
                this.setState({
                    subHeader: "Add a new stay",
                    showTable: false,
                    showAddForm: true
                });
                break;
            case "back":
                this.setState({
                    subHeader: "Current Stays",
                    available: "active",
                    all: "default",
                    showTable: true,
                    showDetails: false
                });
                if (this.state.availableBefore) {
                    this.handlerButtons("available");
                }
                else {
                    this.handlerButtons("all");
                }
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
        //TODO check validity of date
        this.fetchData(true);
    }

    handleFilter(evt) {
        let filter = evt.target.value;
        //parse data, show only stays with status value equal to filter
        parseStaysData(this.state.data.slice(1,), filter).then((tableData) => {
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
            editData: data
        });
        console.log(data);
    }

    handleShowDetails(data) {
        let stayDetails = null;

        this.state.data.forEach((stay) => {
            if (stay.id === data.id) {
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

        if (this.state.editData === null) {  //add a new stay
            url = 'https://young-cliffs-79659.herokuapp.com/checkIn';
        }
        else {  //edit the stay
            url = 'https://young-cliffs-79659.herokuapp.com/editStay';
            data['id'] = this.state.editData.id;
        }

        sendRequest(url, data)
            .then(() => {
                console.log("data sent successfully");
                this.setState({sending: false});
                this.handlerButtons("back");
            }, (err) => {
                //TODO handle error
            });
    }

    render() {
        let clsBtn = "btn btn-info ";
        let title = <h1 className="page-header">{this.state.subHeader}</h1>;
        let content = null;

        let calendarInput = (
            <CalendarInput startDate={this.state.startDate}
                           endDate={this.state.endDate}
                           onChangeStart={this.handleDayChange.bind(this, "start")}
                           onChangeEnd={this.handleDayChange.bind(this, "end")}/>
        );

        let filter = (
            <div className='btn-toolbar pull-left' style={{marginLeft:10}}>
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
        );

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

        if (this.state.showTable) {
            content = (
                <div>
                    <Table TableData={this.state.tableData}
                           onEdit={this.state.isNotChild ? this.handlerEditBtn.bind(this) : null}
                           order={this.props.isChild}
                           //onRemove={this.handlerRemove.bind(this)}
                           removeBtnName={"CheckOut"}
                           showDetails={this.handleShowDetails.bind(this)}/>
                </div>
            )
        }
        else if (this.state.showDetails) {
            content = (
                <div>
                    {title}
                    <BackBtn onClick={this.handlerButtons.bind(this, "back")}/>
                    <hr/>
                    <DetailsTable Headers={this.state.stay}
                                  DetailsData={this.state.data}/>
                    <h3 className="page-header">Room:</h3>

                    <h3 className="page-header">Guest:</h3>
                    <DetailsTable Headers={this.state.guest}
                                  DetailsData={this.state.data.guest}/>
                    <h3 className="page-header">Employee:</h3>
                    <DetailsTable Headers={this.state.employee}
                                  DetailsData={this.state.data.employee}/>
                </div>
            )
        }
        else if (this.state.showAddForm) {
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

        let upperToolbar = (
            <div>
                {this.state.isNotChild ? title : null}
                {this.state.isNotChild ? LeftBtnToolbar : null}
                {calendarInput}
                {filter}
                {this.state.isNotChild ? <AddBtn Add={this.handlerButtons.bind(this, "add")}/> : null}
            </div>
        );

        return (
            <div>
                {this.state.showTable ? upperToolbar : null}
                {this.state.pending ? <Loading /> : content}
            </div>
        );
    }
}
