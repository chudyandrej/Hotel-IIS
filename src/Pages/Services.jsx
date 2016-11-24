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
            subHeader: "Available Services",
            tableHeaders: [{name: "Name", actual_price: "Price", duration: "Duration"}],
            detailsHeaders: {
                name: "Name:", actual_price: "Price:", description: "Description:",
                duration: "Duration:"
            },

            showTable: true,
            showAddForm: false,
            showDetails: false,
            addBtnClicked: false,

            editData: null,
            data: [],
            pending: true,
            sending: false,
            errorMsg: null
        };
    }

    componentWillMount() {
        this.fetchData({available:true});
    }

    fetchData(data) {
        this.setState({pending: true});
        sendRequest('https://young-cliffs-79659.herokuapp.com/getServices', {data}).then((data)=> {
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
            subHeader: "Available Services"
        });
        this.fetchData({available:true});
    }

    handlerUnAvailableBtn() {
        this.setState({
            available: "default",
            unavailable: "active",
            subHeader: "Unavailable Services"
        });
        this.fetchData({available:false});
    }

    handlerEditBtn(data) {
        // data = data are sent by the row, which a user wants to edit
        this.setState({
            subHeader: "Edit the service",
            showTable: false,
            showAddForm: false,
            addBtnClicked: false,

            editData: data
        });
    }

    handlerAddBtn() {
        this.setState({
            subHeader: "Add a new service",
            showTable: false,
            showAddForm: true,
            addBtnClicked: true,
        });
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
            showDetails: false,
            addBtnClicked: false
        });
        this.fetchData({available:true});
    }

    handleShowDetails(data) {
        this.setState({
            showTable: false,
            showDetails: true,
            data: data
        })
    }

    handlerSubmitBtn(data) {
        this.setState({sending: true, errorMsg: null});
        let url = null;

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
                console.log(err);
                console.log(JSON.parse(err.text).message);
                this.setState({
                    sending: false,
                    errorMsg: JSON.parse(err.text).message});
            });
    }

    handlerOrderBtn(data) {
        //TODO
    }

    render() {
        let clsBtn = "btn btn-info ";

        let content = null;

        if (this.state.showTable) {
            let LeftBtnToolbar = (
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
                </div>
            );

            content = (
                <div>
                    {this.props.isChild == null ? LeftBtnToolbar : null}
                    <Table TableData={this.state.data}
                           onEdit={this.handlerEditBtn.bind(this)}
                           showDetails={this.handleShowDetails.bind(this)}
                           order={this.handlerOrderBtn.bind(this)}
                           onRemove={this.handlerRemove.bind(this)}/>
                </div>
            )
        }
        else if (this.state.showDetails) {
            content = (
                <div>
                    <BackBtn onClick={this.handlerCancelBtn.bind(this)}/>
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
                             errorMsg={this.state.errorMsg}
                             pending={this.state.sending}/>
            )
        }

        return (
            <div>
                <h1 className="page-header">{this.state.subHeader}</h1>

                {this.state.showDetails ? null : <RightBtnToolbar Add={this.handlerAddBtn.bind(this)}
                                                                  AddState={this.state.addBtnClicked}/>}

                {this.state.pending ? <Loading /> : content}
            </div>
        );
    }
}