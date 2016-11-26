# Hotel-IIS


##About


##Install

To install dependencies run following command:

    $ npm install --only=production

To install all dependencies including devDependencies run:

    $ npm install


##Start server

[1.] JSX syntax and ES6, are not supported in all the browsers, so we need to translate them to .js:

    $ npm run build  #will make index.js*

[2.] Start server:

    $ npm start


##Developing front-end:

Following command will run frontEnd code in watchmode - index.js is retranslated after changes were
made. The command also creates a server on port 8080 (available in browser as localhost:8080) by running
webpack-dev-server package

    $ npm run dev

Note: the server is not running, so there won't be any interaction with back-end


##Sources
[bootstrap theme](https://www.bootstrapzero.com/bootstrap-template/free-admin-theme)