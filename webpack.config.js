var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const root = __dirname;
const dest = './static';
const src = './static';

// setting for webpack
module.exports = {
    entry: {
        'bundle': src + '/js/entry.js',
    },
    // watch: true,
    devtool: 'source-map',
    output: {
        path: dest,
        publicPath: '/',
        filename: 'js/[name].js'
    },
    resolve: {
        root: [path.join(root, 'bower_components')],
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({
            _: 'lodash',
            riot: 'riot',
            Hammer: 'hammerjs',
            Optiscroll: 'optiscroll',
        }),
        new ExtractTextPlugin('css/[name].css'),
    ],
    module: {
        loaders: [{
            test: /\.tag$/,
            exclude: /node_modules/,
            loader: 'riotjs-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.styl$/,
            // loader: 'style-loader!css-loader!stylus-loader'
            // loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'stylus-loader')
            // loader: ExtractTextPlugin.extract('stylus', 'css-loader!stylus-loader')
            loader: ExtractTextPlugin.extract('css-loader!stylus-loader'),
            // exculde: /node_modules/
        }, {
            test: /\.css$/,
            // loader: ExtractTextPlugin.extract('css')
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'stylus-loader')
        }, ]
    },
    stylus: {
        use: [require('kouto-swiss')()]
    }
};
