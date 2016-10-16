import React from 'react';
import {Link} from 'react-router';


import Header from './Components/Header.jsx';
import SideBar from './Components/SideBar.jsx';


export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row row-offcanvas row-offcanvas-left">
                        <SideBar />
                        {this.props.children}

                    </div>
                </div>
            </div>
        );
    }
}
