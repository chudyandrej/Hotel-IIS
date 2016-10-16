import React from 'react';

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
                        <div className="col-sm-9 col-md-10 main">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
