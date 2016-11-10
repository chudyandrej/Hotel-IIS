import React from 'react';

import Header from './Components/Header.jsx';
import SideBar from './Components/SideBar.jsx';


export default class Layout extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    componentWillMount(){
        console.log("checking if user is still signed in: "+ this.context.user.loggedIn); //DEBUG
        if (!this.context.user.loggedIn){
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
