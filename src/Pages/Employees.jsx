import React from 'react';
import request from 'superagent';

import Table from '../Components/Table.jsx';
import EmployeeForm from '../Components/Forms/EmployeeForm.jsx';
import RightBtnToolbar from '../Components/RightBtnToolbar.jsx';


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
            data: null
        };
    }

    componentWillMount(){
        /*
        fetch('https://young-cliffs-79659.herokuapp.com/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'jerdna11@gmail.com',
                password: "123456789"
            }).then(function(resp){
              console.log(resp)
            })
        }); */

        /*request
            .post('https://young-cliffs-79659.herokuapp.com/login')
            .set('Accept', 'application/json')
            .field('user[email]', 'jerdna11@gmail.com')
            .field('user[password]', '123456789')
            .end(function(err, res){
                console.log(err);
                console.log(res);
            });*/
    }

    handlerEditBtn(data) {
        // data = data which sends the row, which a user wants to edit
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

        var FAKEservicesDATA = [
            {name: "Name", desc: "Description", price: "Salary"},
            {name: "Emp1", desc: "desc", price: 400},
            {name: "Emp2", desc: "desc", price: 400},
            {name: "Emp3", desc: "desc", price: 400}
        ];

        return (
            <div>
                <h2 className="page-header">{this.state.subHeader}</h2>

                {this.state.showTable ? LeftBtnToolbar : null}

                <RightBtnToolbar Add={this.handlerAddBtn.bind(this)}
                                 AddState={this.state.addBtnClicked}
                                 Remove={this.handlerRemoveBtn.bind(this)}/>

                {this.state.showTable ?
                    <Table TableData={FAKEservicesDATA}
                           onEdit={this.handlerEditBtn.bind(this)}
                           onRemove={this.handlerRemoveBtn}
                           RemoveAction={this.state.removeAction}/> : Form}
            </div>
        );
    }
}