import React from 'react';
import {hashHistory} from 'react-router';


export default class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: null,
            password: null
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

    _login(e) {
        e.preventDefault();
        //TODO call backend

        //router.transitionTo('dashboard');
        console.log("here");
        //this.history.pushState(null, 'dashboard');
        hashHistory.push('/dashboard');
    }

    render() {
        return (
            <div>
                <input placeholder="username" />
                <input placeholder="password" />
                <button onClick={this._login}>Login</button>
            </div>
        );
    }
}