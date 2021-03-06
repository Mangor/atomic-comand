var path = require('path');
var nib = require('nib');
var webpack = require('webpack');
//var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            path.resolve(__dirname, 'src/main.js')
        ]
    },
    devtool: 'source-map',
    output: {
        pathinfo: true,
        path: path.join(__dirname, "dist"),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    watch: true,
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.pug'
        }),
        new ExtractTextPlugin('assets/styles/main.css'),
        new CopyWebpackPlugin([
            {from: 'src/assets/img', to: 'assets/img'},
            {from: 'src/assets/shaders', to: 'assets/shaders'},
        ]),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
        })
    ],
    eslint: {
        emitWarning: true
    },
    devServer: {
        contentBase: "dist",
        hot: true,
        inline: true,
        colors: true,
        progress: true,
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: false,
            errorDetails: false,
            warnings: false,
            publicPath: false
        }
    },
    module: {
        // noParse: /node_modules\/phaser\/build\/custom\/p2.js/,
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            include: path.join(__dirname, 'src')
        }, {
            test: /pixi\.js/,
            loader: 'expose?PIXI'
        }, {
            test: /phaser-split\.js$/,
            loader: 'expose?Phaser'
        }, {
            test: /p2\.js/,
            loader: 'expose?p2'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.styl$/,
            exculde: /node_modules/,
            loader: ExtractTextPlugin.extract('css-loader!stylus-loader')
        }, {
            include: /\.pug/,
            // pass options to pug as a query ('pug-html-loader?pretty')
            loader: 'pug-html-loader'
        }]
    },
    stylus: {
        use: [nib()],
        import: ['~nib/lib/nib/index.styl']
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    }
};
