import React from 'react';
import moment from 'moment';

import AddBtn from '../Components/Buttons/AddBtn.jsx';
import BackBtn from '../Components/Buttons/BackBtn.jsx';
import BookRoomForm from '../Components/Forms/BookRoomForm.jsx';
import CalendarInput from '../Components/CalendarInput.jsx';
import DetailsTable from '../Components/Tables/DetailsTable.jsx';
import EditStayForm from '../Components/Forms/EditStayForm.jsx';
import Loading from '../Components/Loading.jsx';
import StaySummaryTable from '../Components/Tables/StaySummaryTable.jsx';
import Table from '../Components/Tables/Table.jsx';

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
            sending: false,

            errorNotification: null
        };
    }

    componentDidMount() {
        this.fetchData(true);
    }

    fetchData(current) {
        this.setState({pending: true});
        let toSend = null;
        if (current) {
            toSend = {
                from: moment().format('YYYY-MM-DD'),
                to: moment().add(1, "day").format('YYYY-MM-DD'),
                statuses: ["inProgress", "reservation"]
            };
        }
        else {
            toSend = {
                from: moment("20140101", "YYYYMMDD"),
                to: moment("20200101", "YYYYMMDD")
            };
            this.setState({startDate: toSend.from, endDate: toSend.to});
            toSend['from'] = toSend.from.format('YYYY-MM-DD');
            toSend['to'] = toSend.to.format('YYYY-MM-DD');
        }

        downloadData('getStays', toSend).then((data) => {
            parseStaysData(data, "all").then((tableData) => {
                data = this.state.tableHeaders.concat(data);
                tableData = this.state.tableHeaders.concat(tableData);
                this.setState({pending: false, data: data, tableData: tableData});
            });
        }, (err) => {
            this.setState({errorNotification: err.popup, pending: false});
        });
    }

    handlerButtons(name) {
        switch (name) {
            case "available":
                this.setState({
                    subHeader: "Current Stays",
                    available: "active",
                    all: "default",
                    availableBefore: true,
                    filter: "all"
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
                    availableBefore: false,
                    filter: "all"
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
                if (this.state.availableBefore) {
                    this.handlerButtons("available");
                }
                else {
                    this.handlerButtons("all");
                }
                this.setState({
                    showTable: true,
                    showDetails: false
                });
        }
    }

    handleDayChange(name, date) {
        switch (name) {
            case "start":
                if (!date.isBefore(this.state.endDate)) {
                    this.setState({data: []});
                    return;
                }
                this.setState({startDate: date});
                break;
            case "end":
                if (date.isBefore(this.state.startDate)) {
                    this.setState({data: []});
                    return;
                }
                this.setState({endDate: date});
                break;
        }
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
            url = 'https://hotel-iis.herokuapp.com/checkIn';
        }
        else {  //edit the stay
            url = 'https://hotel-iis.herokuapp.com/editStay';
            data['id'] = this.state.editData.id;
        }

        sendRequest(url, data)
            .then(() => {
                this.setState({sending: false});
                this.handlerButtons("back");
            }, (err) => {
                //close form and show notification
                this.handlerCancelBtn();
                this.setState({sending: false, errorNotification: err.popup});
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
            <div className='btn-toolbar pull-left' style={{marginLeft: 10}}>
                Status:
                <select value={this.state.filter}
                        onChange={this.handleFilter.bind(this)}>
                    <option value="all">all</option>
                    <option value="inProgress">inProgress</option>
                    <option value="reservation">reservation</option>
                    {this.state.isNotChild && this.state.all === "active" ? <option value="ended">ended</option> : null}
                    {this.state.isNotChild && this.state.all === "active" ?
                        <option value="canceled">canceled</option> : null}
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
                    <h3 className="page-header">Guest:</h3>
                    <DetailsTable Headers={this.state.guest}
                                  DetailsData={this.state.data.guest}/>
                    <h3 className="page-header">Employee:</h3>
                    <DetailsTable Headers={this.state.employee}
                                  DetailsData={this.state.data.employee}/>
                    <br/>
                    <StaySummaryTable stayId={this.state.data.id}/>
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
                    <EditStayForm Cancel={this.handlerButtons.bind(this, "back")}
                                  Submit={this.handlerSubmitBtn.bind(this)}
                                  pending={this.state.sending}
                                  status={this.state.editData.status}
                                  note={this.state.editData.note}
                                  details={
                                      <div>
                                          <DetailsTable Headers={this.state.stay}
                                                        DetailsData={this.state.editData}/>
                                          <h3 className="page-header">Guest:</h3>
                                          <DetailsTable Headers={this.state.guest}
                                                        DetailsData={this.state.editData.guest}/>
                                          <h3 className="page-header">Employee:</h3>
                                          <DetailsTable Headers={this.state.employee}
                                                        DetailsData={this.state.editData.employee}/>
                                          <StaySummaryTable stayId={this.state.editData.id}/>
                                      </div>
                                  }/>
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

        if (this.state.errorNotification != null) {
            content = this.state.errorNotification;
        }

        return (
            <div>
                {this.state.showTable ? upperToolbar : null}
                {this.state.pending ? <Loading /> : content}
            </div>
        );
    }
}
