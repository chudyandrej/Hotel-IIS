import React from 'react';
import cookie from 'react-cookie';
import {hashHistory} from 'react-router';

import {sendRequest} from '../Functions/HTTP-requests.js';


export default class Header extends React.Component {

    onClickLogout() {

        sendRequest('https://young-cliffs-79659.herokuapp.com/logout', {}).then((data)=>{
            console.log("logged out");
        }, (err)=>{
            //TODO handle error
        });

        cookie.remove('token');
        cookie.remove('loggedIn');
        console.log("you've been logged out");
        hashHistory.push('/');
    }

    render() {
        return (
            <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Hotel-IIS</a>
                    </div>

                    <div className='btn-toolbar pull-right'>
                        <div className='btn-group'>
                            <button type='button' className='btn btn-primary' onClick={this.onClickLogout.bind(this)}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}