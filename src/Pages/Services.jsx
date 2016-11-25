import cookie from 'react-cookie';
import React from 'react';

import BackBtn from '../Components/Buttons/BackBtn.jsx';
import DetailsTable from '../Components/DetailsTable.jsx';
import Loading from '../Components/Loading.jsx';
import OrderService from '../Components/Forms/OrderService.jsx';
import AddBtn from '../Components/Buttons/AddBtn.jsx';
import ServiceForm from '../Components/Forms/ServiceForm.jsx';
import Table from '../Components/Table.jsx';

import {sendRequest} from '../Functions/HTTP-requests.js';


export default class Services extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            root: cookie.load('permissions') === "root",
            available: "active",
            unavailable: "default",
            subHeader: "Services",
            isNotChild: typeof(this.props.isChild) === "undefined",
            tableHeaders: [{name: "Name", actual_price: "Price", duration: "Duration"}],
            detailsHeaders: {
                name: "Name:", actual_price: "Price:", description: "Description:",
                duration: "Duration:"
            },

            showTable: true,
            showAddForm: false,
            showDetails: false,

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
        sendRequest('https://young-cliffs-79659.herokuapp.com/getServices', data).then((data)=> {
            data = this.state.tableHeaders.concat(JSON.parse(data.text));
            this.setState({pending: false, data: data});
        }, (err)=> {
            //TODO handle error
        });
    }

    handlerBtn(name) {
        switch(name) {
            case "available":
                this.setState({
                    available: "active",
                    unavailable: "default",
                    subHeader: "Available Services"
                });
                this.fetchData({available:true});
                break;
            case "unavailable":
                this.setState({
                    available: "default",
                    unavailable: "active",
                    subHeader: "Unavailable Services"
                });
                this.fetchData({available:false});
                break;
            case "add":
                this.setState({
                    subHeader: "Add a new service",
                    showTable: false,
                    showAddForm: true
                });
                break;
            case "cancel":
                console.log("before FML");
                console.log(this.handlerBtn.bind(this));
                this.setState({
                    subHeader: "Services",
                    showTable: true,
                    showAddForm: false,
                    showDetails: false,
                    editData: null
                });
                console.log("after FML");
                this.fetchData({available:true});
                break;
        }
    }

    handlerOrderBtn(data) {
        this.setState({
            showTable: false,
            showDetails: false,
            showAddForm: false,
            data: data
        });
        console.log("order data");
        console.log(data);
    }

    handlerEditBtn(data) {
        // data = data are sent by the row, which a user wants to edit
        this.setState({
            subHeader: "Edit the service",
            showTable: false,
            showAddForm: true,

            editData: data
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

    handleShowDetails(data) {
        this.setState({
            showTable: false,
            showDetails: true,
            data: data
        });
        console.log("details data");
        console.log(data);
    }

    handlerSubmitBtn(data) {
        this.setState({sending: true, errorMsg: null});
        let url = null;

        if (this.state.editData === null) {  //add a new service
            url = 'https://young-cliffs-79659.herokuapp.com/addNewService';
        }
        else {  //edit the service
            url = 'https://young-cliffs-79659.herokuapp.com/editService';
            data['id'] = this.state.editData.id;
            this.setState({editData: null});
        }

        sendRequest(url, data)
            .then(()=> {
                console.log("data sent successfully");
                this.setState({sending: false});
                this.handlerBtn("cancel");
            }, (err)=> {
                console.log(err);
                console.log(JSON.parse(err.text).message);
                this.setState({
                    sending: false,
                    errorMsg: JSON.parse(err.text).message});
            });
    }

    handlerOrderService(data) {
        this.setState({sending: true});
        sendRequest('https://young-cliffs-79659.herokuapp.com/reserveService', data)
            .then(() => {
                console.log("data sent successfully");
                this.setState({sending: false});
                this.handlerBtn("cancel");
            }, (err) => {
                this.setState({
                    sending: false,
                    errorMsg: JSON.parse(err.text).message
                });
            });
    }

    render() {
        let clsBtn = "btn btn-info ";

        let content = null;
        let title =  <h1 className="page-header">{this.state.subHeader}</h1>;
        let addBtn = <AddBtn Add={this.handlerBtn.bind(this, "add")}/>;

        let LeftBtnToolbar = (
            <div className='btn-toolbar pull-left'>
                <button type="button"
                        className={clsBtn + this.state.available}
                        onClick={this.handlerBtn.bind(this, "available")}>
                    Available
                </button>
                <button type="button"
                        className={clsBtn + this.state.unavailable}
                        onClick={this.handlerBtn.bind(this, "unavailable")}>
                    Unavailable
                </button>
            </div>
        );

        if (this.state.showTable) {
            let availableTable = (
                <Table TableData={this.state.data}
                       onEdit={this.state.root ? this.handlerEditBtn.bind(this) : null}
                       showDetails={this.handleShowDetails.bind(this)}
                       order={this.handlerOrderBtn.bind(this)}
                       onRemove={this.state.root ? this.handlerRemove.bind(this) : null}/>
            );

            content = (
                <div>
                    {this.state.available === "active" ? availableTable : <Table TableData={this.state.data} /> }
                </div>
            )
        }
        else if (this.state.showDetails) {
            content = (
                <div>
                    {this.state.isNotChild ? title : null}
                    <BackBtn onClick={this.handlerBtn.bind(this, "cancel")}/>
                    <DetailsTable Headers={this.state.detailsHeaders}
                                  DetailsData={this.state.data}/>
                </div>
            )
        }

        else if (this.state.showAddForm) {    //add or edit form
            content = (
                <div>
                    {title}
                    <ServiceForm Submit={this.handlerSubmitBtn.bind(this)}
                                 Cancel={this.handlerBtn.bind(this, "cancel")}
                                 editData={this.state.editData}
                                 errorMsg={this.state.errorMsg}
                                 pending={this.state.sending}/>
                </div>
            )
        }
        else {
            content = (
                <OrderService Cancel={this.handlerBtn.bind(this, "cancel")}
                              Order={this.handlerOrderService.bind(this)}
                              service={this.state.data}
                              serviceInfo={
                                  <DetailsTable Headers={this.state.detailsHeaders}
                                                DetailsData={this.state.data}/>
                              }
                              pending={this.state.sending}>
                </OrderService>
            )
        }

        let upperToolbar = (
            <div>
                {this.state.isNotChild ? title : null}
                {this.state.isNotChild ? LeftBtnToolbar : null}
                {this.state.isNotChild && this.state.root ? addBtn : null}
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