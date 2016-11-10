import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';

import EmployeeForm from '../Components/Forms/EmployeeForm.jsx';
import Loading from '../Components/Loading.jsx';
import RightBtnToolbar from '../Components/RightBtnToolbar.jsx';
import Table from '../Components/Table.jsx';


export default class Employees extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            employed: "active",
            all: "default",
            subHeader: "Employees",

            showTable: true,
            showAddForm: false,
            addBtnClicked: false,
            removeAction: false,

            editData: null,
            data: null,
            pending: true
        };
    }

    componentWillMount() {
        request
            .post('https://young-cliffs-79659.herokuapp.com/getAllEmployes')
            .set('Accept', 'application/json')
            .send({token: cookie.load('token')})
            .end((err, res)=> {
                if (err != null || !res.ok) {
                    console.log("error while fetching data");  //debug
                    //TODO logout user
                } else {
                    console.log(res);
                    this.setState({pending: false, data: JSON.parse(res.text)});
                    console.log(this.state.data);
                }
            });
    }

    handlerEditBtn(data) {
        // data = data are sent by the row, which a user wants to edit
        this.setState({
            subHeader: "Edit the employee",
            showTable: false,
            showAddForm: false,
            addBtnClicked: false,
            removeAction: false,

            editData: data
        });
    }

    handlerEmployedBtn() {
        this.setState({
            employed: "active",
            all: "default",
            subHeader: "Employees"
        });
    }

    handlerAllBtn() {
        this.setState({
            employed: "default",
            all: "active",
            subHeader: "Former Employees"
        });
    }

    handlerAddBtn() {
        this.setState({
            subHeader: "Add a new employee",
            showTable: false,
            showAddForm: true,
            addBtnClicked: true,
            removeAction: false
        });
    }

    handlerRemoveBtn() {
        this.setState({removeAction: !this.state.removeAction});
    }

    handlerCancelBtn() {
        this.setState({
            subHeader: "Employees",
            showTable: true,
            showAddForm: false,
            addBtnClicked: false
        });
    }

    handlerSubmitBtn(data) {
        //TODO send form to backend

        socket
    }

    render() {
        var clsBtn = "btn btn-info ";

        var Form = (
            <EmployeeForm Submit={this.handlerSubmitBtn.bind(this)}
                          Cancel={this.handlerCancelBtn.bind(this)}
                          editData={this.state.editData}/>
        );

        var LeftBtnToolbar = (
            <div className='btn-toolbar pull-left'>
                <button type="button"
                        className={clsBtn + this.state.employed}
                        onClick={this.handlerEmployedBtn.bind(this)}>
                    Employed
                </button>
                <button type="button"
                        className={clsBtn + this.state.all}
                        onClick={this.handlerAllBtn.bind(this)}>
                    Former
                </button>
            </div>
        );

        var content = null;

        if (this.state.showTable) {
            content = (
                <Table TableData={this.state.data}
                       onEdit={this.handlerEditBtn.bind(this)}
                       onRemove={this.handlerRemoveBtn}
                       RemoveAction={this.state.removeAction}/>
            )
        }
        else {
            content = (
                {Form}
            )
        }

        return (
            <div>
                <h2 className="page-header">{this.state.subHeader}</h2>

                {this.state.showTable ? LeftBtnToolbar : null}

                <RightBtnToolbar Add={this.handlerAddBtn.bind(this)}
                                 AddState={this.state.addBtnClicked}
                                 Remove={this.handlerRemoveBtn.bind(this)}/>

                {this.state.pending ? <Loading /> : content}

            </div>
        );
    }
}