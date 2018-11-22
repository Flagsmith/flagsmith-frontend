// webpack.config.prod.js
// Watches + deploys files minified + cachebusted

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    devtool: 'source-map',

    entry: {
        main: './web/main.js'
    },
    optimization: { //chunk bundle into Libraries, App JS and dumb components
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // set to true if you want JS source maps
                extractComments:true,
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                    }
                }
            })
        ],
        // splitChunks: {
        //     chunks: 'all',
        //     minSize: 0,
        //     maxAsyncRequests: Infinity,
        //     maxInitialRequests: Infinity,
        //     name: true,
        //     cacheGroups: {
        //         default: {
        //             name: 'main',
        //             chunks: 'async',
        //             minSize: 30000,
        //             minChunks: 2,
        //             maxAsyncRequests: 5,
        //             maxInitialRequests: 3,
        //             priority: -20,
        //             test: function (module) {
        //                 var test = module.resource && module.resource.indexOf('node_modules') == -1;
        //                 test && console.log("Main > " + module.resource)
        //                 return test;
        //             },
        //             reuseExistingChunk: true,
        //         },
        //         vendors: {
        //             name: 'vendors',
        //             enforce: true,
        //             test: function (module) {
        //                 var test = module.resource && module.resource.indexOf('node_modules') != -1;
        //                 return test;
        //             },
        //             priority: -10,
        //             reuseExistingChunk: true,
        //         },
        //         components: {
        //             name: 'components',
        //             enforce: true,
        //             test: function (module) {
        //                 var test = module.resource && module.resource.indexOf('node_modules') == -1
        //                     && (
        //                         module.resource && module.resource.indexOf('web/pages') != -1 ||
        //                         module.resource && module.resource.indexOf('web/components') != -1
        //                     );
        //                 test && console.log("Components > " + module.resource)
        //                 return test;
        //             },
        //             priority: -10,
        //             reuseExistingChunk: true,
        //         },
        //     },
        // },
    },
    output: {
        path: path.join(__dirname, '../build/static'),
        filename: '[name].[hash].js',
        publicPath: 'https://cdn.bullet-train.io/static/'
    },

    plugins: require('./plugins')
        .concat([
                //Clear out build folder
                new CleanWebpackPlugin(['build'], {root: path.join(__dirname, '../')}),

                //reduce filesize
                new webpack.optimize.OccurrenceOrderPlugin(),

                //pull inline styles into cachebusted file
                new ExtractTextPlugin({filename: "style.[hash].css", allChunks: true}),

            ]
        )
        .concat(require('./pages').map(function (page) {
            console.log(page);
            return new HtmlWebpackPlugin({
                    filename: page + '.handlebars', //output
                    template: './web/' + page + '.handlebars', //template to use
                    "assets": { //add these script/link tags
                        "client": "/[hash].js",
                        "style": "style.[hash].css"
                    }
                }
            )
        })),

    module: {
        rules: require('./loaders').concat([
            {
                use: 'babel-loader',
                test: /\.js?/,
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!sass-loader"})
            }
        ])
    }
}
;
