import React from 'react';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
import DetailsTable from '../Components/DetailsTable.jsx';
import Loading from '../Components/Loading.jsx';
import RightBtnToolbar from '../Components/Buttons/RightBtnToolbar.jsx';
import ServiceForm from '../Components/Forms/ServiceForm.jsx';
import Table from '../Components/Table.jsx';

import {sendRequest} from '../Functions/HTTP-requests.js';


export default class Services extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            available: "active",
            unavailable: "default",
            all: "default",
            subHeader: "Available Services",
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
        sendRequest('https://young-cliffs-79659.herokuapp.com/getServices', {}).then((data)=> {
            data = this.state.tableHeaders.concat(JSON.parse(data.text));
            this.setState({pending: false, data: data});
        }, (err)=> {
            //TODO handle error
        });
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

    handlerOrderBtn() {
        //TODO
    }

    handlerEditBtn(data) {
        // data = data are sent by the row, which a user wants to edit
        this.setState({
            subHeader: "Edit the service",
            showTable: false,
            showAddForm: false,
            addBtnClicked: false,
            removeAction: false,

            editData: data
        });
    }

    handlerAddBtn() {
        this.setState({
            subHeader: "Add a new service",
            showTable: false,
            showAddForm: true,
            addBtnClicked: true,
            removeAction: false
        });
    }

    handlerRemoveBtn() {
        this.setState({removeAction: !this.state.removeAction});
    }

    handlerRemove(id) {
        sendRequest('https://young-cliffs-79659.herokuapp.com/editService', {available: false, id: id})
            .then((data)=> {
                console.log("data's deleted successfully");
                this.setState({sending: false});
            }, (err)=> {
                //TODO handle error
            });
    }

    handlerCancelBtn() {
        this.setState({
            subHeader: "Services",
            showTable: true,
            showAddForm: false,
            addBtnClicked: false
        });
        this.fetchData();
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

        if (this.state.editData == null) {  //add a new service
            url = 'https://young-cliffs-79659.herokuapp.com/addNewService';
        }
        else {  //edit the service
            url = 'https://young-cliffs-79659.herokuapp.com/editService';
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

            content = (
                <div>
                    {LeftBtnToolbar}
                    <Table TableData={this.state.data}
                           onEdit={this.handlerEditBtn.bind(this)}
                           onRemove={this.handlerRemove.bind(this)}
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
                <ServiceForm Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.handlerCancelBtn.bind(this)}
                             editData={this.state.editData}
                             pending={this.state.sending}/>
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