import React from 'react';
import {hashHistory} from 'react-router';
import request from 'superagent';
import cookie from 'react-cookie';

import Loading from '../Components/Loading.jsx';


export default class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: "",
            password: "",
            error: false,
            loginClicked: false,
            hoverLoginForm: false,
            pending: false
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
                if (!this.state.hoverLoginForm && !this.state.pending) {
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
        this.setState({pending: true});
        request
            .post('https://young-cliffs-79659.herokuapp.com/login')
            .set('Accept', 'application/json')
            .send({ email: 'jerdna11@gmail.com', password: '123456789' })  //for debug
            //.send({email: this.state.username, password: this.state.password})
            .end((err, res)=>{
                if (err != null || !res.ok) {
                    console.log('Oh no! error');  //DEBUG
                    console.log(res);
                    this.setState({username: "", password: ""});
                    this.setState({error: true, pending: false});
                } else {
                    this.setState({error: false, pending: false});

                    cookie.remove('token');
                    cookie.remove('loggedIn');
                    cookie.save('token', JSON.parse(res.text).token);
                    cookie.save('loggedIn', true);
                    hashHistory.push('/dashboard');
                }
            });
    }

    render() {
        var errorMsg = <strong className="alert alert-danger">Wrong username or password!</strong>;
        var content = null;
        if (this.state.loginClicked && !this.state.pending) {
            content = (
                <div className="formContainerLogin text-center">
                    {this.state.error ? errorMsg : null}
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
            )
        }
        else if(this.state.pending) {
            content = (
                <Loading  />
            )
        }
        else {
            content = null;
        }

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
                    {content}
                </div>
            </div>
        );
    }
}