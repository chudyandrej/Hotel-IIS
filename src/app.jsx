import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Analytics from './Pages/Analytics.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Employees from './Pages/Employees.jsx';
import Guests from './Pages/Guests.jsx';
import Layout from './Layout.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import NotFound from './Pages/NotFound.jsx';
import PreLoginLayout from './PreLoginLayout.jsx';
import Rooms from './Pages/Rooms.jsx';
import Search from './Pages/Search.jsx';
import Services from './Pages/Services.jsx';
import Stays from './Pages/Stays.jsx';


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={PreLoginLayout}>
            <IndexRoute component={LoginPage}/>
            <Route path="/dashboard" component={Layout}>
                <IndexRoute component={Dashboard}/>
                <Route path="/dashboard/search" component={Search}/>
                <Route path="/dashboard/rooms" component={Rooms}/>
                <Route path="/dashboard/services" component={Services}/>
                <Route path="/dashboard/analytics" component={Analytics}/>
                <Route path="/dashboard/employees" component={Employees}/>
                <Route path="/dashboard/guests" component={Guests}/>
                <Route path="/dashboard/stays" component={Stays}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);


