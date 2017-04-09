var isDevBuild = process.argv.indexOf('--env.prod') < 0;
var path = require('path');
var webpack = require('webpack');

var bundleOutputDir = './lib';

module.exports = {
    resolve: { extensions: ['.ts'] },
    entry: {
        index: './src/index.ts'
    },
    output: {
        path: path.resolve(bundleOutputDir),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    externals: {
        "aurelia-framework": "aurelia-framework",
        "redux": "redux"
    },
    module: {
        loaders: [
            { test: /\.ts$/, include: /src/, loader: 'ts-loader', query: { silent: true } },
        ]
    },
    plugins: [

    ].concat(isDevBuild ? [] : [
        new webpack.optimize.UglifyJsPlugin()
    ])
};
