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

            tableHeaders: [{
                last_name: "Last Name", status: "Status", from: "From", to: "To", roomNumber: "Room"
            }],
            stay: {
                status: "Status:", from: "From:", to: "To:", note: "Note:"
            },
            rooms: {
                roomNumber: "Room:", priceOfRoom: "Price:" //TODO more info about room
            },
            guest: {
                first_name: "First Name:", middle_name: "Middle Name:", last_name: "Last Name:",
                idCardNumber: "Card Number:", email: "Email:", phoneNumber: "Phone number:",
                nameCompany: "Company Name:", ico: "ICO:", dic: "DIC:",
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

    parseData(data) {
        var tableData = [];
        var rooms = [];

        data.forEach(function (row) {
            rooms = [];

            row.rooms.forEach(function (room) {
                rooms.push(room.templateRoom.roomNumber);

            });
            rooms = rooms.toString();
            console.log(rooms);
            tableData.push(
                {
                    id: row.id,
                    last_name: row.guest.last_name,
                    status: row.status,
                    from: moment(row.from).format('YYYY-MM-DD'),
                    to: moment(row.to).format('YYYY-MM-DD'),
                    roomNumber: rooms
                }
            );
        }.bind(this));

        return tableData;
    }


    fetchData() {
        this.setState({pending: true});
        var toSend = {
            from: "2016-05-04",//this.state.startDate.format('YYYY-MM-DD'),
            to: "2016-12-06",//this.state.endDate.format('YYYY-MM-DD')
        };
        sendRequest('https://young-cliffs-79659.herokuapp.com/getStays', toSend).then((data)=> {
            data = JSON.parse(data.text);
            var tableData = this.parseData(data);
            data = this.state.tableHeaders.concat(data);
            tableData = this.state.tableHeaders.concat(tableData);
            this.setState({pending: false, data: data, tableData: tableData});
        }, (err)=> {
            //TODO handle error
            console.log("error");
            console.log(err);
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
                break;
        }
        this.fetchData();
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
        var stayDetails = null;

        this.state.data.forEach(function (stay) {
            if (stay.id == data.id) {
                stayDetails = stay;
            }
        });

        stayDetails['from'] = moment(stayDetails.from).format('YYYY-MM-DD');
        stayDetails['to'] = moment(stayDetails.to).format('YYYY-MM-DD');

        this.setState({
            //subHeader: "Stay Details",
            showTable: false,
            showDetails: true,
            data: stayDetails
        });
    }

    handlerBackBtn() {
        this.setState({
           // subHeader: "Current Stays",
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
                    <BackBtn onClick={this.handlerBackBtn.bind(this)}/>
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
