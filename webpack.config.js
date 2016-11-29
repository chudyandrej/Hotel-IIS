var webpack = require('webpack');


function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}


module.exports = {
    entry: {
        app: getEntrySources([
            './src/app.jsx'
        ])
    },
    output: {
        publicPath: './public/',
        filename: 'public/index.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.png$|\.gif$/,
                loader: "url-loader?mimetype=image/png"
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};