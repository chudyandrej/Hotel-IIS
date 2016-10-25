import React from 'react';
import {hashHistory} from 'react-router';


export default class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: null,
            password: null,
            loginClicked: false
        };
        this._handleUsernameChange = this._handleUsernameChange.bind(this);
        this._handlePasswordChange = this._handlePasswordChange.bind(this);
    }

    _handleUsernameChange(evt) {
        this.setState({
            username: evt.target.value
        });
    }

    _handlePasswordChange(evt) {
        this.setState({
            password: evt.target.value
        });
    }

    handlerClick(type) {
        switch (type){
            case "login":
                this.setState({loginClicked: true});
                break;
            case "any":
                this.setState({loginClicked: false});
                break;
        }
    }

    _login(e) {
        e.preventDefault();
        //TODO call backend

        //router.transitionTo('dashboard');
        console.log("here");
        //this.history.pushState(null, 'dashboard');
        hashHistory.push('/dashboard');
    }

    render() {

        var LoginForm = (
            <div className="formContainerLogin text-center">
                <div className="formLogin">
                    <input placeholder="username" />
                    <input placeholder="password" />
                    <div className='text-center'>
                        <div className="btn-group" style={{marginTop:5}}>
                            <button type='button'
                                    className='btn btn-primary'
                                    onClick={this._login.bind(this)}>Login</button>
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