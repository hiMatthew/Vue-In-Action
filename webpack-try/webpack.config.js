var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
    devtools: "eval-source-map",
    entry: __dirname + "/es6/main.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
                test: path.join(__dirname, 'es6'),
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            }, {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader?modules'
            }, // use ! to chain loaders
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            } // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new uglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new HtmlwebpackPlugin({
          title: 'Webpack-demos',
          filename: 'index.html'
        }),
        new OpenBrowserPlugin({
          url: 'http://localhost:8080'
        })
    ],
    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true
    }
}
