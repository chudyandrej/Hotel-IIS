import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';


export default class Header extends React.Component {

    onClickLogout() {
        request
            .post('https://young-cliffs-79659.herokuapp.com/logout')
            .set('Accept', 'application/json')
            .send({ token: cookie.load('token') })
            .end((err, res)=>{
                if (err != null || !res.ok) {
                    console.log("error while fetching data");  //debug
                } else {
                    console.log("logged out");   //debug
                }
            });
        cookie.remove('token');
        cookie.remove('loggedIn');
    }

    render() {
        return (
            <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Hotel-ISS</a>
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