import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';


export default class SideBar extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            dashboard: "default",
            rooms: "default",
            search: "default",
            services: "default",
            guests: "default",
            stays: "default",
            analytics: "default",
            employees: "default",

            activeLocation: null
        };
        this.setBtnActive = this.setBtnActive.bind(this);
    }

    componentDidMount() {
       this.setBtnActive(this.props.activeLocation);
       this.setState({activeLocation: this.props.activeLocation});
    }

    componentWillReceiveProps(nextProps){
        if (this.props.activeLocation != nextProps.activeLocation){
            this.setState({activeLocation: nextProps.activeLocation});
            this.setBtnActive(nextProps.activeLocation);
        }
    }

    setBtnActive(path) {
        let active = path.split("/");
        if (active.length > 2) {
            this.handlerBtn(active[2]);
        }
        else {
            this.handlerBtn("dashboard");
        }
    }

    handlerBtn(type) {
        this.setState ({
            dashboard: type == "dashboard" ? "active" : "default",
            rooms: type == "rooms" ? "active" : "default",
            search: type == "search" ? "active" : "default",
            services: type == "services" ? "active" : "default",
            guests: type == "guests" ? "active" : "default",
            stays: type == "stays" ? "active" : "default",
            analytics: type == "analytics" ? "active" : "default",
            employees: type == "employees" ? "active" : "default"
        });
    }

    /*
    // ----- Beyond the school project -------

    // Link requires root permissions
     <li className={this.state.analytics}>
         <Link to="/dashboard/analytics" onClick={this.handlerBtn.bind(this, "analytics")}>
            Analytics
         </Link>
     </li>

     //link requires usual (user) permissions
     <li className={this.state.search}>
         <Link to="/dashboard/search" onClick={this.handlerBtn.bind(this, "search")}>
            Search
         </Link>
     </li>
     */

    render() {
        let highPermissionsPages = (
            <ul className="nav nav-sidebar">
                <li className={this.state.employees}>
                    <Link to="/dashboard/employees" onClick={this.handlerBtn.bind(this, "employees")}>
                        Employees
                    </Link>
                </li>
            </ul>
        );

        return (
            <div className="col-sm-3 col-md-2 sidebar-offcanvas" id="sidebar" role="navigation">
                <ul className="nav nav-sidebar">
                    <li className={this.state.dashboard}>
                        <Link to="/dashboard" onClick={this.handlerBtn.bind(this, "dashboard")}>
                            Dashboard
                        </Link>
                    </li>
                    <li className={this.state.rooms}>
                        <Link to="/dashboard/rooms" onClick={this.handlerBtn.bind(this, "rooms")}>
                            Rooms
                        </Link>
                    </li>
                    <li className={this.state.services}>
                        <Link to="/dashboard/services" onClick={this.handlerBtn.bind(this, "services")}>
                            Services
                        </Link>
                    </li>
                    <li className={this.state.guests}>
                        <Link to="/dashboard/guests" onClick={this.handlerBtn.bind(this, "guests")}>
                            Guests
                        </Link>
                    </li>
                    <li className={this.state.stays}>
                        <Link to="/dashboard/stays" onClick={this.handlerBtn.bind(this, "stays")}>
                            Stays
                        </Link>
                    </li>
                </ul>
                {cookie.load('permissions') == "root" ? highPermissionsPages : null}
            </div>
        );
    }
}