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
            guests: "default",
            analytics: "default",
            employees: "default"
        };
        this.handlerDashboardBtn = this.handlerDashboardBtn.bind(this);
        this.handlerRoomsBtn = this.handlerRoomsBtn.bind(this);
        this.handlerSearchBtn = this.handlerSearchBtn.bind(this);
        this.handlerServicesBtn = this.handlerServicesBtn.bind(this);
        this.handlerGuestsBtn = this.handlerGuestsBtn.bind(this);
        this.handlerAnalyticsBtn = this.handlerAnalyticsBtn.bind(this);
        this.handlerEmployeesBtn = this.handlerEmployeesBtn.bind(this);
    }

    handlerDashboardBtn() {
        this.setState ({
            dashboard: "active",
            rooms: "default",
            search: "default",
            services: "default",
            guests: "default",
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
            guests: "default",
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
            guests: "default",
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
            guests: "default",
            analytics: "default",
            employees: "default"
        });
    }

    handlerGuestsBtn() {
        this.setState ({
            dashboard: "default",
            rooms: "default",
            search: "default",
            services: "default",
            guests: "active",
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
            guests: "default",
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
            guests: "default",
            analytics: "default",
            employees: "active"
        });
    }


    render() {
        return (
            <div className="col-sm-3 col-md-2 sidebar-offcanvas" id="sidebar" role="navigation">
                <ul className="nav nav-sidebar">
                    <li className={this.state.dashboard}>
                        <Link to="/dashboard" onClick={this.handlerDashboardBtn}>Dashboard</Link>
                    </li>
                    <li className={this.state.search}>
                        <Link to="/dashboard/search" onClick={this.handlerSearchBtn}>Search</Link>
                    </li>
                    <li className={this.state.rooms}>
                        <Link to="/dashboard/rooms" onClick={this.handlerRoomsBtn}>Rooms</Link>
                    </li>
                    <li className={this.state.services}>
                        <Link to="/dashboard/services" onClick={this.handlerServicesBtn}>Services</Link>
                    </li>
                    <li className={this.state.guests}>
                        <Link to="/dashboard/guests" onClick={this.handlerGuestsBtn}>Guests</Link>
                    </li>
                </ul>
                <ul className="nav nav-sidebar">
                    <li className={this.state.analytics}>
                        <Link to="/dashboard/analytics" onClick={this.handlerAnalyticsBtn}>Analytics</Link>
                    </li>
                    <li className={this.state.employees}>
                        <Link to="/dashboard/employees" onClick={this.handlerEmployeesBtn}>Employees</Link>
                    </li>
                </ul>
            </div>
        );
    }
}