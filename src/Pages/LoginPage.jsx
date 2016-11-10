import React from 'react';
import {hashHistory} from 'react-router';
import request from 'superagent';


export default class LoginPage extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: "",
            password: "",
            error: false,
            loginClicked: false,
            hoverLoginForm: false
        };
    }

    handlerOnChange(type, evt) {
        switch (type) {
            case "name":
                this.setState({username: evt.target.value});
                break;
            case "password":
                this.setState({password: evt.target.value});
                break;
        }
    }

    handlerClick(type) {
        switch (type) {
            case "login":
                this.setState({loginClicked: true});
                break;
            case "any":
                if (!this.state.hoverLoginForm) {
                    this.setState({loginClicked: false});
                }
                break;
        }
    }

    handleHover(type) {
        switch (type) {
            case "up":
                this.setState({hoverLoginForm: true});
                break;
            case "down":
                this.setState({hoverLoginForm: false});
                break;
        }
    }

    _login(e) {
        e.preventDefault();
        request
            .post('https://young-cliffs-79659.herokuapp.com/login')
            .set('Accept', 'application/json')
            .send({ email: 'jerdna11@gmail.com', password: '123456789' })  //for debug
            //.send({email: this.state.username, password: this.state.password})
            .end((err, res)=>{
                if (err != null || !res.ok) {
                    console.log('Oh no! error');  //DEBUG
                    this.setState({username: "", password: ""});
                    this.setState({error: true});
                    //TODO show error
                } else {
                    //fill user structure
                    this.setState({error: false});
                    var token = JSON.parse(res.text).token;
                    var user = {
                        loggedIn: true,
                        userName: this.state.username,
                        token: token,
                    };
                    console.log(user);  //DEBUG
                    this.context.user.changeHandler(user);
                    hashHistory.push('/dashboard');
                }
            });
    }

    render() {

        var LoginForm = (
            <div className="formContainerLogin text-center">
                <div className="formLogin"
                     onMouseLeave={this.handleHover.bind(this, "down")}
                     onMouseEnter={this.handleHover.bind(this, "up")}>
                    <input placeholder="username"
                           type="text"
                           value={this.state.username}
                           onChange={this.handlerOnChange.bind(this, "name")}/>
                    <input placeholder="password"
                           type="password"
                           value={this.state.password}
                           onChange={this.handlerOnChange.bind(this, "password")}/>
                    { this.state.error ? <strong className="form-text alert alert-danger">ERROR</strong> : null }
                    <div className='text-center'>
                        <div className="btn-group" style={{marginTop: 5}}>
                            <button type='button'
                                    className='btn btn-primary'
                                    onClick={this._login.bind(this)}>Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <div className='btn-toolbar pull-right'>
                        <div className='btn-group'>
                            <button type='button'
                                    className='btn btn-primary'
                                    onClick={this.handlerClick.bind(this, "login")}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <div id="background-image-login" onClick={this.handlerClick.bind(this, "any")}>
                    {this.state.loginClicked ? LoginForm : null}
                </div>
            </div>
        );
    }
}