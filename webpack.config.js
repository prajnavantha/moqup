var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './app/index.js',
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/static/',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'ngRoute': 'angular-route'
        }
    },
    // resolve: {
    //     alias: {
    //         // bind version of jquery-ui
    //         "jquery-ui": "jquery-ui/jquery-ui.js",
    //         // bind to modules;
    //         modules: path.join(__dirname, "node_modules")
    //     }
    // },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css/,
                loader: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: /node_modules/,
            },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }

        ]
    }
}
