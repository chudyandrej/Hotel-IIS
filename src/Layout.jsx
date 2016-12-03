import React from 'react';
import {hashHistory} from 'react-router';
import cookie from 'react-cookie';

import Header from './Components/Header.jsx';
import SideBar from './Components/SideBar.jsx';


export default class Layout extends React.Component {

    componentWillMount() {
        if (!cookie.load('loggedIn')) {
            hashHistory.push('/');
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row row-offcanvas row-offcanvas-left">
                        <SideBar activeLocation={this.props.location.pathname}/>
                        <div className="col-sm-9 col-md-10 main">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
