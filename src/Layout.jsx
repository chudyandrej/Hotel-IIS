import React from 'react';
import {hashHistory} from 'react-router';
import cookie from 'react-cookie';

import Header from './Components/Header.jsx';
import SideBar from './Components/SideBar.jsx';


export default class Layout extends React.Component {

    componentWillMount(){
        console.log("checking if user is still signed in: " + cookie.load('loggedIn'));  //DEBUG
        if (!cookie.load('loggedIn')){
            hashHistory.push('/');
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row row-offcanvas row-offcanvas-left">
                        <SideBar />
                        <div className="col-sm-9 col-md-10 main">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
