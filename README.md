# Hotel-IIS


## About
The project was created as a school project. Its aim is to try and learn new technologies for developing user interfaces
and create a fully functional information system for a hotel with nice and modern web user interface. 
Backend of the system is implemented in Node.js and frontend in React.js.


## Functionality
The system is able to:
 - add/edit/remove an employee
 - show all relevant employee information
 - give/edit an employee's permissions to the system (none/regular user/root)
 - add/edit a guest
 - add/edit/remove/order a service
 - create a stay/change state of a stay - (reservation, canceled, ended, in progress)
 - show/book rooms
 - filter all shown data, f.e. according to date (current guests, available rooms, ...)
 - search in shown data
 - calculate/show price of a stay according to number of days, ordered services and rooms prices


## Install

To install dependencies run the following command:

    $ npm install


## Start server

[1.] JSX syntax and ES6, are not supported in all browsers, so it's needed to translate them to .js:

    $ npm run build  #will make index.js*

[2.] Start server:

    $ npm start


## Developing front-end:

Following command will run frontEnd code in watchmode - index.js is retranslated after changes are
made. The command also creates a server on port 8080 (available in browser as localhost:8080/public/) by running
webpack-dev-server package

    $ npm run dev

Note: the server is not running, so there won't be any interaction with back-end


## Sources
[bootstrap theme](https://www.bootstrapzero.com/bootstrap-template/free-admin-theme)