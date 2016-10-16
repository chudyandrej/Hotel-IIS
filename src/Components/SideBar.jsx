import React from 'react';
import {Link} from 'react-router';


export default class SideBar extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            dashboard: "active",
            rooms: "default",
            search: "default",
            services: "default",
            analytics: "default",
            employees: "default"
        };
        this.handlerDashboardBtn = this.handlerDashboardBtn.bind(this);
        this.handlerRoomsBtn = this.handlerRoomsBtn.bind(this);
        this.handlerSearchBtn = this.handlerSearchBtn.bind(this);
        this.handlerServicesBtn = this.handlerServicesBtn.bind(this);
        this.handlerAnalyticsBtn = this.handlerAnalyticsBtn.bind(this);
        this.handlerEmployeesBtn = this.handlerEmployeesBtn.bind(this);
    }

    handlerDashboardBtn() {
        this.setState ({
            dashboard: "active",
            rooms: "default",
            search: "default",
            services: "default",
            analytics: "default",
            employees: "default"
        });
    }

    handlerRoomsBtn() {
        this.setState ({
            dashboard: "default",
            rooms: "active",
            search: "default",
            services: "default",
            analytics: "default",
            employees: "default"
        });
    }

    handlerSearchBtn() {
        this.setState ({
            dashboard: "default",
            rooms: "default",
            search: "active",
            services: "default",
            analytics: "default",
            employees: "default"
        });
    }

    handlerServicesBtn() {
        this.setState ({
            dashboard: "default",
            rooms: "default",
            search: "default",
            services: "active",
            analytics: "default",
            employees: "default"
        });
    }

    handlerAnalyticsBtn() {
        this.setState ({
            dashboard: "default",
            rooms: "default",
            search: "default",
            services: "default",
            analytics: "active",
            employees: "default"
        });
    }

    handlerEmployeesBtn() {
        this.setState ({
            dashboard: "default",
            rooms: "default",
            search: "default",
            services: "default",
            analytics: "default",
            employees: "active"
        });
    }

    render() {
        return (
            <div className="col-sm-3 col-md-2 sidebar-offcanvas" id="sidebar" role="navigation">
                <ul className="nav nav-sidebar">
                    <li className={this.state.dashboard}>
                        <Link to="/" onClick={this.handlerDashboardBtn}>Dashboard</Link>
                    </li>
                    <li className={this.state.search}>
                        <Link to="/search" onClick={this.handlerSearchBtn}>Search</Link>
                    </li>
                    <li className={this.state.rooms}>
                        <Link to="/rooms" onClick={this.handlerRoomsBtn}>Rooms</Link>
                    </li>
                    <li className={this.state.services}>
                        <Link to="/services" onClick={this.handlerServicesBtn}>Services</Link>
                    </li>
                </ul>
                <ul className="nav nav-sidebar">
                    <li className={this.state.analytics}>
                        <Link to="/analytics" onClick={this.handlerAnalyticsBtn}>Analytics</Link>
                    </li>
                    <li className={this.state.employees}>
                        <Link to="/employees" onClick={this.handlerEmployeesBtn}>Employees</Link>
                    </li>
                </ul>
            </div>
        );
    }
}