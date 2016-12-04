var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var PUBLIC_PATH = path.resolve(ROOT_PATH, 'public');

module.exports = {
    devtools: "eval-source-map",
    entry: {
        app:__dirname + "/es6/main.js",
        vendors:['jquery']
    },
    output: {
        path: PUBLIC_PATH,
        filename: "bundle.[hash].js"
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
                loader: 'style-loader!css-loader!less-loader'
            }, // use ! to chain loaders
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            } // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    },
    resolve: {
        extensions: ['', '.js','.css','.less']
    },
    plugins: [
        new HtmlwebpackPlugin({
          filename: __dirname + "/public/index.html"
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new uglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new OpenBrowserPlugin({
          url: 'http://localhost:8080'
        }), 
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
        }),
        new ExtractTextPlugin("[name]-[hash].css")
    ],
    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true
    }
}
