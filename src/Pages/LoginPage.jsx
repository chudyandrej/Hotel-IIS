import React from 'react';
import {hashHistory} from 'react-router';
import request from 'superagent';
import cookie from 'react-cookie';

import ImageLoader from 'react-imageloader';
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
            //.send({ email: 'jerdna11@gmail.com', password: '123456789' })  //for debug
            .send({email: this.state.username, password: this.state.password})
            .end((err, res)=>{
                if (err != null || !res.ok) {
                    console.log('Oh no! error');  //DEBUG
                    console.log(res);
                    this.setState({username: "", password: ""});
                    this.setState({error: true, pending: false});
                } else {
                    this.setState({error: false, pending: false});

                    cookie.remove('token');
                    cookie.remove('permissions');
                    cookie.remove('loggedIn');
                    cookie.save('token', JSON.parse(res.text).token);
                    cookie.save('permissions', JSON.parse(res.text).permissions);
                    cookie.save('loggedIn', true);
                    hashHistory.push('/dashboard');
                }
            });
    }

    render() {
        let errorMsg = <strong className="alert alert-danger">Wrong username or password!</strong>;
        let content = null;
        if (this.state.loginClicked && !this.state.pending) {
            content = (
                <div className="jumbotron">
                    {this.state.error ? errorMsg : null}
                    <div className="container"
                         onMouseLeave={this.handleHover.bind(this, "down")}
                         onMouseEnter={this.handleHover.bind(this, "up")}>
                        <h2 className="login">Login</h2>
                        <div className="box">
                            <input placeholder="email"
                                   type="text"
                                   value={this.state.username}
                                   onChange={this.handlerOnChange.bind(this, "name")}/>
                            <input placeholder="password"
                                   type="password"
                                   value={this.state.password}
                                   onChange={this.handlerOnChange.bind(this, "password")}/>
                                    <button  onClick={this._login.bind(this)}
                                             className="btn btn-default full-width">
                                        <ImageLoader src="../../public/img/login.png" />
                                    </button>
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