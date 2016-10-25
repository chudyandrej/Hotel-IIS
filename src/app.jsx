import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

//import Auth from './RequireAuth.jsx';
import PreLoginLayout from './PreLoginLayout.jsx';
import LoginPage from './Pages/LoginPage.jsx';

import Layout from './Layout.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Search from './Pages/Search.jsx';
import Rooms from './Pages/Rooms.jsx';
import Services from './Pages/Services.jsx';
import Analytics from './Pages/Analytics.jsx';
import Employees from './Pages/Employees.jsx';
import Guests from './Pages/Guests.jsx';
import NotFound from './Pages/NotFound.jsx';


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={PreLoginLayout}>
            <IndexRoute component={LoginPage}/>
            <Route path="/dashboard" component={Layout}>
                <IndexRoute component={Dashboard} />
                <Route path="/dashboard/search" component={Search} />
                <Route path="/dashboard/rooms" component={Rooms}/>
                <Route path="/dashboard/services" component={Services} />
                <Route path="/dashboard/analytics" component={Analytics} />
                <Route path="/dashboard/employees" component={Employees} />
                <Route path="/dashboard/guests" component={Guests} />
                <Route path="*" component={NotFound} />
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);


